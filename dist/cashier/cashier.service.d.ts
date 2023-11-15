import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword, EditUser } from 'src/global-dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CashierService {
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
    editCashier(req: any, dto: EditUser): Promise<{
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
    getMedicalHistory(id: number, req: any): Promise<{
        status: number;
        data: {
            data: {};
            patient: {};
            clinic: {};
            doctor: {};
            pharmacy: {};
            services: {};
            total: number;
        };
        message: string;
    }>;
    getDone(id: number, req: any): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
}
