import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { SuperAdminResponse } from 'src/response';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SuperAdminDto } from 'src/auth/dto';
import {
  ChangePasswordClinic,
  CreateNewClinicDto,
  EditClinic,
  EditSuperAdminDto,
} from './dto';

@Injectable()
export class SuperAdminService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private AuthService: AuthService,
  ) {}

  async createSuperAdmin(dto: SuperAdminDto) {
    const checkEmail = await this.AuthService.checkEmail(dto.email, '');

    if (!checkEmail) {
      throw new BadRequestException('email sudah terdaftar');
    }

    if (dto.password !== dto.confPassword)
      return { status: 401, msg: 'password tidak cocok' };
    try {
      const hash: string = await argon.hash(dto.password);

      const newAdmin = await this.prisma.superAdmin.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash,
        },
      });

      delete newAdmin.password;
      return SuperAdminResponse(201, newAdmin, 'Admin Baru Telah Ditambahkan');
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException({
            status: 403,
            msg: 'email sudah terdafar',
            errorr: error.code,
          });
        }
      }
      throw error;
    }
  }
  async editSuperAdmin(req: any, dto: EditSuperAdminDto) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });
    const idClinic: number = parseInt(payload.sub);

    const superAdmin = await this.prisma.superAdmin.findUnique({
      where: {
        id: idClinic,
      },
    });

    if (dto.email) {
      const checkEmail = await this.AuthService.checkEmail(
        dto.email,
        superAdmin.email,
      );

      if (!checkEmail) {
        throw new BadRequestException('email sudah terdaftar');
      }
    }else{
      delete dto.email
    }

    if (!superAdmin) {
      throw new NotFoundException('super admin tidak ditemukan');
    }
    const superAdminPassword = await argon.verify(
      superAdmin.password,
      dto.password,
    );

    if (!superAdminPassword) {
      throw new BadRequestException('password salah');
    }

    delete dto.password;

    const user = await this.prisma.superAdmin.update({
      where: {
        id: idClinic,
      },
      data: {
        ...dto,
      },
    });

    if (!user) {
      throw new ForbiddenException(' ');
    }

    delete user.password;
    delete user.is_deleted;

    return SuperAdminResponse(204, user, 'berhasil mengubah data');
  }

  async deleteSuperAdmin(id: number) {
    const deletedSuperAdmin = await this.prisma.superAdmin.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });

    if (!deletedSuperAdmin) {
      throw new NotFoundException({
        status: 404,
        message: 'akun tidak ditemukan',
      });
    }
    delete deletedSuperAdmin.password;
    delete deletedSuperAdmin.is_deleted;
    return SuperAdminResponse(
      204,
      deletedSuperAdmin,
      `berhasil menghapus super admin ${deletedSuperAdmin.name}`,
    );
  }
  async createNewClinic(dto: CreateNewClinicDto) {
    if (
      dto.type.toLocaleLowerCase() !== 'regular' &&
      dto.type.toLocaleLowerCase() !== 'premium'
    ) {
      throw new ForbiddenException(
        'type harus bernilai dengan regular atau premium',
      );
    }
    const checkEmail = await this.AuthService.checkEmail(dto.email);

    if (!checkEmail) {
      throw new BadRequestException(
        'Email sudah digunakan , silahkan gunakan alamat email yang lain',
      );
    }

    if (dto.password !== dto.confPassword)
      throw new ForbiddenException('password tidak sama');
    const hash: string = await argon.hash(dto.password);

    const expired_at = new Date(dto.expired_at);

    delete dto.password;
    delete dto.expired_at;
    delete dto.confPassword;

    try {
      const newClinic = await this.prisma.clinic.create({
        data: {
          expired_at,
          password: hash,
          ...dto,
        },
      });

      return newClinic;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error);
    }
  }

  async editClinic(id: number, dto: EditClinic) {
    if (
      dto.type.toLocaleLowerCase() !== 'regular' &&
      dto.type.toLocaleLowerCase() !== 'premium'
    ) {
      throw new ForbiddenException(
        'type harus bernilai dengan regular atau premium',
      );
    }

    const findClinic = await this.prisma.clinic.findUnique({
      where: {
        id: id,
        is_deleted: false,
      },
    });

    if (!findClinic) {
      throw new NotFoundException({
        status: 404,
        message: 'akun klinik tidak ditemukan',
      });
    }

    if (dto.email) {
      const checkEmail = await this.AuthService.checkEmail(
        dto.email,
        findClinic.email,
      );
      if (!checkEmail) {
        throw new BadRequestException(
          'Email sudah digunakan , silahkan gunakan alamat email yang lain',
        );
      }
    }

    let expired_at: Date;

    if (!dto.expired_at) {
      delete dto.expired_at;
    } else {
      expired_at = new Date(dto.expired_at);
    }

    delete dto.expired_at;
    const clinic = await this.prisma.clinic.update({
      where: {
        id: id,
      },
      data: {
        expired_at: expired_at,
        ...dto,
      },
    });
    delete clinic.password;

    return SuperAdminResponse(204, clinic, `berhasil mengubah ${clinic.name}`);
  }

  async deleteClinic(id: number) {
    const clinic = await this.prisma.clinic.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });

    if (!clinic) {
      throw new NotFoundException('klinik tidak ditemukan');
    }

    return SuperAdminResponse(
      204,
      clinic,
      `berhasil menghapus klinik ${clinic.name}`,
    );
  }

  async getPaymentClinic(id: number) {
    const paymentCount: number = await this.prisma.medical_History.count({
      where: {
        clinic_id: id,
        status: 'done',
        payment_status: false,
      },
    });

    if (paymentCount === 0) {
      return SuperAdminResponse(
        200,
        { message: ' klinik sudah menyelesaikan semua pembayaran ' },
        'klinik sudah menyelesaikan semua pembayaran',
      );
    }
    return SuperAdminResponse(
      200,
      { tagihan: paymentCount },
      ' berhasil mendapatkan tagihan di clinic',
    );
  }

  async getAllClinic() {
    const paraClinic = await this.prisma.clinic.findMany({
      where: {
        is_deleted: false,
      },
    });

    if (paraClinic.length < 1) {
      throw new NotFoundException('tidak ada data klinik');
    }

    return SuperAdminResponse(
      200,
      paraClinic,
      'berhasil mendapatkan semua klinik',
    );
  }

  async getClinicById(id: number) {
    const clinic = await this.prisma.clinic.findUnique({
      where: {
        id: id,
        is_deleted: false,
      },
    });
    const paymentCount: number = await this.prisma.medical_History.count({
      where: {
        clinic_id: id,
        status: 'done',
        payment_status: false,
      },
    });

    const data = {
      clinic,
      paymentCount,
    };

    if (!clinic) {
      throw new NotFoundException('data klinik tidak ditemukan');
    }

    return SuperAdminResponse(200, data, `berhasil mendapatkan ${clinic.name}`);
  }

  async clinicPayment(id: number) {
    const clinic = await this.prisma.medical_History.updateMany({
      where: {
        clinic_id: id,
        payment_status: false,
        status: 'done',
      },
      data: {
        payment_status: true,
      },
    });

    if (!clinic) {
      throw new NotFoundException('klinik sudah membayar seluruh tagihan');
    }

    return SuperAdminResponse(
      200,
      clinic,
      'selesai menghapus seluruh tagihan untuk klinik terkait',
    );
  }

  async changePasswordClinic(id: number, dto: ChangePasswordClinic) {
    if (dto.confPassword !== dto.newPassword) {
      throw new BadRequestException('password dan confirm password harus sama');
    }

    const hash = await argon.hash(dto.newPassword);

    try {
      const clinic = await this.prisma.clinic.update({
        where: {
          id: id,
        },
        data: {
          password: hash,
        },
      });
      return SuperAdminResponse(
        204,
        clinic,
        `berhasil mengubah password ${clinic.name}`,
      );
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
