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
  GetPatient,
  QueueResponse,
  ServiceResponse,
  UserResponse,
} from 'src/response';
import * as argon from 'argon2';
import { AddService, EditMedicalHistory } from './dto';
import { PatientResponse } from 'src/response/doctor.response';
import { newQueue } from 'src/auth/types';

@Injectable()
export class DoctorService {
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

    const user = await this.prisma.doctor.findUnique({
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

  async editDoctor(req: any, dto: EditUser) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });

    const iuser = await this.prisma.doctor.findUnique({
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

    const user = await this.prisma.doctor.update({
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

    const iuser = await this.prisma.doctor.findUnique({
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

    const user = await this.prisma.doctor.update({
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
    const id = payload.sub;

    const queue = await this.prisma.medical_History.findMany({
      where: {
        doctor_id: id,
        status: 'on_doctor',
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
            gender : patient.gender,
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

  async getService(req: any) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });
    const id = payload.sub;

    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    const services = await this.prisma.master_Service.findMany({
      where: {
        clinic_id: doctor.clinic_id,
        is_deleted: false,
        type: 'service',
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

  async addService(dto: AddService) {
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

  async editMedicalHistory(id: number, dto: EditMedicalHistory) {
    try {
      const medicalhistory = await this.prisma.medical_History.update({
        where: {
          id,
        },
        data: {
          ...dto,
          status: 'on_pharmacy',
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

  async getPatient(id: number) {
    const medicalHistory = await this.prisma.medical_History.findMany({
      where: {
        patient_id: id,
        is_deleted: false,
        status: 'done',
      },
    });

    
    const patient = await this.prisma.patient.findUnique({
      where: {
        id,
      },
    });


    if (!patient) {
      throw new NotFoundException('pasien tidak ditemukan');
    }
    
    if (medicalHistory.length < 1) {
      return GetPatient(
        200,
        patient,
        medicalHistory ,
        'berhasil mendapatkan data pasien',
      );
    }
    return GetPatient(
      200,
      patient,
      medicalHistory,
      'berhasil mendapatkan data pasien',
    );
  }

  async getMedicalHistoryById(id: number) {
    const medicalHistory = await this.prisma.medical_History.findUnique({
      where: {
        id,
        is_deleted: false,
        status: 'done',
        NOT: {
          patient_id: null,
          doctor_id: null,
          receptionist_id: null,
        },
      },
    });

    if (!medicalHistory) {
      throw new NotFoundException('riwayat pengobatan tidak ditemukan');
    }

    const patient = await this.prisma.patient.findUnique({
      where: {
        id: medicalHistory.patient_id,
      },
    });

    const clinic = await this.prisma.clinic.findUnique({
      where: {
        id: medicalHistory.clinic_id,
      },
    });
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id: medicalHistory.doctor_id,
      },
    });
    const receptionist = await this.prisma.receptionist.findUnique({
      where: {
        id: medicalHistory.receptionist_id,
      },
    });

    const service = await this.prisma.service.findMany({
      where: {
        medical_history_id: medicalHistory.id,
      },
    });

    const services: any[] = [];

    await Promise.all(
      service.map(async (e) => {
        const masterservice = await this.prisma.master_Service.findUnique({
          where: {
            id: e.master_service_id,
          },
        });

        delete masterservice.is_deleted;
        delete masterservice.created_at;
        delete masterservice.updated_at;
        delete masterservice.clinic_id;

        services.push(masterservice);
      }),
    );

    return PatientResponse(
      200,
      medicalHistory,
      clinic,
      patient.name,
      { name: doctor.name, spesialist: doctor.specialist },
      receptionist.name,
      services,
      'berhasil mendapatkan data',
    );
  }


  async getActive (req : any , status : boolean){
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.get('JWT_SECRET'),
    });
    const id = payload.sub;

    const user = await this.prisma.doctor.update({
      where : {
        id : id
      },
      data : {
        is_active : status
      }
    })


    if(!user){
      throw new BadRequestException('gagal update status')
    }


    return UserResponse(200 , user.is_active , user.clinic_id , 'berhasil mengubah status')
  }

  
}
