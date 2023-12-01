import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword, EditUser } from 'src/global-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CashierResponse, QueueResponse, UserResponse } from 'src/response';
import * as argon from 'argon2';
import { ServiceCashier, newQueue } from 'src/auth/types';

@Injectable()
export class CashierService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async getUser(req: any) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });

    const id = payload.sub;

    const user = await this.prisma.cashier.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('user tidak ditemukan');
    }

    delete user.password;
    delete user.is_deleted;

    return UserResponse(
      200,
      user,
      user.clinic_id,
      `berhasil mendapatkan data ${user.name}`,
    );
  }

  async editCashier(req: any, dto: EditUser) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });

    const iuser = await this.prisma.cashier.findUnique({
      where: {
        id: payload.sub,
      },
    });
    const id = payload.sub;

    if (!iuser) {
      throw new NotFoundException('user tidak ditemukan');
    }

    const matches = await argon.verify(iuser.password, dto.password);

    if (!matches) {
      throw new BadRequestException('password salah');
    }

    const user = await this.prisma.cashier.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
      },
    });

    if (!user) {
      throw new NotFoundException('user tidak ditemukan');
    }

    return UserResponse(
      200,
      user,
      user.clinic_id,
      `berhasil mengubah data ${user.name}`,
    );
  }

  async changePassword(req: any, dto: ChangePassword) {
    if (dto.newPassword !== dto.confPassword) {
      throw new BadRequestException(
        'password baru dan confirm password tidak sama',
      );
    }
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });

    const iuser = await this.prisma.cashier.findUnique({
      where: {
        id: payload.sub,
      },
    });
    const id = payload.sub;

    const matches = await argon.verify(iuser.password, dto.oldPassword);

    if (!matches) {
      throw new BadRequestException(
        'password lama salah , jikan anda lupa password anda silahkan tanyakan kepada admin',
      );
    }

    const password = await argon.hash(dto.newPassword);

    const user = await this.prisma.cashier.update({
      where: {
        id: payload.sub,
      },
      data: {
        password,
      },
    });

    if (!user) {
      throw new ForbiddenException();
    }

    return UserResponse(
      204,
      user,
      user.clinic_id,
      `berhasil mengganti password ${user.name}`,
    );
  }

  async getQueue(req: any) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });

    const user = await this.prisma.cashier.findUnique({
      where: {
        id: payload.sub,
      },
    });

    const clinic = await this.prisma.clinic.findUnique({
      where: {
        id: user.clinic_id,
      },
    });

    const queue = await this.prisma.medical_History.findMany({
      where: {
        clinic_id: clinic.id,
        status: 'on_cashier',
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    if (queue.length < 1) {
      return QueueResponse(404, 0, `tidak ada antiran untuk saat ini`);
    }
    let queues: newQueue[] = [];
    await Promise.all(
      queue.map(async (e) => {
        const patient = await this.prisma.patient.findUnique({
          where: {
            id: e.patient_id,
          },
        });

        if (patient) {
          queues.push({
            id : patient.id,
            name: patient.name,
            address: patient.address,
            gender: patient.gender,
            data: e,
          });
        } else {
          console.error(
            `Patient not found for medical history with id ${e.id}`,
          );
        }
      }),
    );

    return QueueResponse(200, queues, `berhasil mendapatkan antrian`);
  }

  async getMedicalHistory(id: number, req: any) {
    const medicalHistory = await this.prisma.medical_History.findUnique({
      where: {
        id,
      },
    });

    const clinic = await this.prisma.clinic.findUnique({
      where: {
        id: medicalHistory.clinic_id,
      },
    });

    delete clinic.password;
    delete clinic.password;

    const patient = await this.prisma.patient.findUnique({
      where: {
        id: medicalHistory.patient_id,
      },
    });
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id: medicalHistory.doctor_id,
      },
    });

    delete doctor.password;
    delete doctor.is_deleted;

    const pharmacy = await this.prisma.pharmacy.findUnique({
      where: {
        id: medicalHistory.pharmacy_id,
      },
    });

    delete pharmacy.password;
    delete pharmacy.is_deleted;

    const service = await this.prisma.service.findMany({
      where: {
        medical_history_id: medicalHistory.id,
      },
    });

    let total: ServiceCashier[] = [];
    await Promise.all(
      service.map(async (e) => {
        const master = await this.prisma.master_Service.findUnique({
          where: {
            id: e.master_service_id,
          },
        });
        total.push({
          name: master.name,
          type : master.type,
          price: master.price,
        });
      }),
    );

    let totalPayment = total.reduce((sum, item) => sum + item.price, 0);

    return CashierResponse(
      200,
      medicalHistory,
      clinic,
      patient,
      doctor,
      pharmacy,
      total,
      totalPayment,
      `berhasil mendapatkan semua tagihan ${patient.name}`,
    );
  }

  async getDone(id: number, req: any) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });

    const user = await this.prisma.cashier.findUnique({
      where: {
        id: payload.sub,
      },
    });
    const medicalHistory = await this.prisma.medical_History.findUnique({
      where: {
        id,
      },
    });

    if (medicalHistory.clinic_id !== user.clinic_id) {
      throw new ForbiddenException(
        'anda tidak punya akses untuk menyelesaikan pembayaran klinik orang lain',
      );
    }

    try {
      const patient = await this.prisma.medical_History.update({
        where: {
          id,
        },
        data: {
          status: 'done',
        },
      });

      return UserResponse(
        200,
        patient,
        user.clinic_id,
        `berhasil melakuakan pembayaran`,
      );
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
