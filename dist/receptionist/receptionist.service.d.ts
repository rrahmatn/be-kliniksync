import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword, EditUser } from 'src/global-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddPatient, AddQueue, EditPatient } from './dto/receptionist.dto';
export declare class ReceptionistService {
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
    editUser(req: any, dto: EditUser): Promise<{
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
    addPatient(dto: AddPatient): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editPatient(id: number, dto: EditPatient): Promise<{
        id: number;
        name: string;
        phone: string;
        birth_date: Date;
        gender: string;
        address: string;
        is_deleted: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    getDoctor(req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    addQueue(req: any, dto: AddQueue): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    searchPatient(phone: string): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getPatient(id: number): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
}
