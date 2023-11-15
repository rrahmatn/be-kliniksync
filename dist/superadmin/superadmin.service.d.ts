import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SuperAdminDto } from 'src/auth/dto';
import { ChangePasswordClinic, CreateNewClinicDto, EditClinic, EditSuperAdminDto } from './dto';
export declare class SuperAdminService {
    private prisma;
    private jwtService;
    private config;
    private AuthService;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService, AuthService: AuthService);
    createSuperAdmin(dto: SuperAdminDto): Promise<{
        status: number;
        data: {};
        message: string;
    } | {
        status: number;
        msg: string;
    }>;
    editSuperAdmin(req: any, dto: EditSuperAdminDto): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deleteSuperAdmin(id: number): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    createNewClinic(dto: CreateNewClinicDto): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        address: string;
        type: string;
        owner: string;
        phone: string;
        expired_at: Date;
        is_deleted: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    editClinic(id: number, dto: EditClinic): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deleteClinic(id: number): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getPaymentClinic(id: number): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getAllClinic(): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getClinicById(id: number): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    clinicPayment(id: number): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    changePasswordClinic(id: number, dto: ChangePasswordClinic): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
}
