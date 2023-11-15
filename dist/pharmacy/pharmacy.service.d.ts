import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword, EditUser } from 'src/global-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddService, EditMedicalHistoryPharmacy } from 'src/doctor/dto';
export declare class PharmacyService {
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
    editPharmacy(req: any, dto: EditUser): Promise<{
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
    editMedicalHistory(id: number, req: any, dto: EditMedicalHistoryPharmacy): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
}
