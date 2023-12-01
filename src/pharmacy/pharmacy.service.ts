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
import {
  QueueResponse,
  ServiceResponse,
  UserResponse,
} from 'src/response';
import * as argon from 'argon2';
import {
  EditMedicalHistoryPharmacy
} from 'src/doctor/dto';
import { newQueue } from 'src/auth/types';
import { AddServiceDto } from './dto';

@Injectable()
export class PharmacyService {
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

    const user = await this.prisma.pharmacy.findUnique({
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

  async editPharmacy(req: any, dto: EditUser) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });

    const iuser = await this.prisma.pharmacy.findUnique({
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

    const user = await this.prisma.pharmacy.update({
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

    const iuser = await this.prisma.pharmacy.findUnique({
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

    const user = await this.prisma.pharmacy.update({
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

    const user = await this.prisma.pharmacy.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new NotFoundException('anda tidak terdaftar dalam klinik');
    }

    const clinic = await this.prisma.clinic.findUnique({
      where: {
        id: user.clinic_id,
      },
    });

    const id = clinic.id;

    const queue = await this.prisma.medical_History.findMany({
      where: {
        clinic_id: id,
        status: 'on_pharmacy',
      },
      orderBy: {
        created_at: 'asc',
      },
    });

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

    if (queue.length < 1) {
      return QueueResponse(404, 0, `tidak ada antiran untuk saat ini`);
    }

    return QueueResponse(200, queues, `berhasil mendapatkan antrian`);
  }

  async getService(req: any) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });
    const id = payload.sub;

    const pharmacy = await this.prisma.pharmacy.findUnique({
      where: {
        id,
      },
    });

    const services = await this.prisma.master_Service.findMany({
      where: {
        clinic_id: pharmacy.clinic_id,
        is_deleted: false,
        type: 'medicine',
      },
    });

    if (services.length < 1) {
      throw new NotFoundException(
        'tidak ada service terkini , harap minta kepada admin untuk menambahkannya',
      );
    }
    return ServiceResponse(
      200,
      services,
      'berhasil mendaptkan seluruh service pada clinic',
    );
  }

  async addService(dto: AddServiceDto) {
    try {
      const service = await this.prisma.service.create({
        data: {
          ...dto,
        },
      });

      return UserResponse(200, service, null, 'berhasil menambahkan service');
    } catch (error) {
      throw new BadRequestException('gagal menambahkan service');
    }
  }

  async editMedicalHistory(id: number, req :any ,dto: EditMedicalHistoryPharmacy) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });

    if (dto.medicine.length < 1) {
      delete dto.medicine;
    }

    try {
      const medicalhistory = await this.prisma.medical_History.update({
        where: {
          id,
        },
        data: {
          ...dto,
          pharmacy_id : payload.sub,
          status: 'on_cashier',
        },
      });

      return UserResponse(
        200,
        medicalhistory,
        medicalhistory.clinic_id,
        'berhasil menambahkan catatan dan obat pada riwayat pengobatan',
      );
    } catch (error) {
      throw new BadGatewayException('gagal menngubah riwayat pengobatan');
    }
  }
}
