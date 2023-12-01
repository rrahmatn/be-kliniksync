import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword, EditUser } from 'src/global-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddService, EditMedicalHistory } from './dto';
export declare class DoctorService {
    private prisma;
    private jwtService;
    private config;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    getUser(req: any): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
    editDoctor(req: any, dto: EditUser): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
    changePassword(req: any, dto: ChangePassword): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
    getQueue(req: any): Promise<{
        status: number;
        queue: {};
        message: string;
    }>;
    getService(req: any): Promise<{
        status: number;
        service: {};
        message: string;
    }>;
    addService(dto: AddService): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
    editMedicalHistory(id: number, dto: EditMedicalHistory): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
    getPatient(id: number): Promise<{
        status: number;
        data: {
            patient: {};
            medical_history: {};
        };
        message: string;
    }>;
    getMedicalHistoryById(id: number): Promise<{
        status: number;
        data: {
            clinic: {};
            patient: string;
            service: {};
            doctor: {};
            receptionist: string;
        };
        message: string;
    }>;
    getActive(req: any, status: boolean): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
}
