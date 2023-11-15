import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePassword, EditClinicDto, EditDoctor, EditEmployes, EditMasterService, ForceChangePassword, MasterService, NewDoctor, NewEmpolye } from './dto';
import { AuthService } from 'src/auth/auth.service';
export declare class ClinicService {
    private prisma;
    private jwtService;
    private config;
    private AuthService;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService, AuthService: AuthService);
    getClinic(id: number): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editClinic(id: number, dto: EditClinicDto): Promise<NotFoundException | {
        message: string;
        data: {
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
        };
    }>;
    changePassword(req: any, dto: ChangePassword): Promise<ForbiddenException | {
        message: string;
        data: {
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
        };
    }>;
    getAllEmployes(req: any): Promise<{
        status: number;
        data: {
            clinic: {};
            employes: {}[];
        };
        message: string;
    }>;
    createNewDoctor(req: any, dto: NewDoctor): Promise<{
        id: number;
        clinic_id: number;
        name: string;
        email: string;
        password: string;
        price: number;
        specialist: string;
        is_active: boolean;
        is_deleted: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    createNewReceptionist(req: any, dto: NewEmpolye): Promise<{
        status: number;
        data: {};
        message: string;
        role: string;
    }>;
    createNewCashier(req: any, dto: NewEmpolye): Promise<{
        status: number;
        data: {};
        message: string;
        role: string;
    }>;
    createNewPharmacy(req: any, dto: NewEmpolye): Promise<{
        status: number;
        data: {};
        message: string;
        role: string;
    }>;
    changePasswordReceptionist(id: number, req: any, dto: ForceChangePassword): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    changePasswordDoctor(id: number, req: any, dto: ForceChangePassword): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    changePasswordPharmacy(id: number, req: any, dto: ForceChangePassword): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    changePasswordCashier(id: number, req: any, dto: ForceChangePassword): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deleteReceptionist(id: number, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deleteDoctor(id: number, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deletePharmacy(id: number, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deleteCashier(id: number, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editReceptionist(id: number, req: any, dto: EditEmployes): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editDoctor(id: number, req: any, dto: EditDoctor): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editPharmacy(id: number, req: any, dto: EditEmployes): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editCashier(id: number, req: any, dto: EditEmployes): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getReceptionistById(id: number, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getDoctorById(id: number, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getPharmacyById(id: number, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getCashierById(id: number, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getAllMasterService(req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getAllMasterServiceById(id: number, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    createMasterService(req: any, dto: MasterService): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editMasterService(id: number, req: any, dto: EditMasterService): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deleteMasterService(id: number, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getTransaction(page: number, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getTransactionById(id: number, req: any): Promise<{
        status: number;
        data: {
            patient: {};
            doctor: {};
            receptionist: {};
            pharmacy: {};
            cashier: {};
            service: any[];
        };
        message: string;
    }>;
}
