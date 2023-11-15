import { SuperAdminService } from './superadmin.service';
import { SuperAdminDto } from 'src/auth/dto';
import { ChangePasswordClinic, CreateNewClinicDto, EditClinic, EditSuperAdminDto } from './dto';
export declare class SuperAdminController {
    private superAdminService;
    constructor(superAdminService: SuperAdminService);
    createSuperAdmin(dto: SuperAdminDto): Promise<{
        status: number;
        data: {};
        message: string;
    } | {
        status: number;
        msg: string;
    }>;
    deleteSuperAdmin(id: string): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editSuperAdmin(req: any, dto: EditSuperAdminDto): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editClinic(id: string, dto: EditClinic): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deleteClinic(id: string): Promise<{
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
    getAllClinic(): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getClinicById(id: string): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    clinicPayment(id: string): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    changePasswordClini(id: string, dto: ChangePasswordClinic): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
}
