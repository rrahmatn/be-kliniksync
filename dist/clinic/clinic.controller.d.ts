import { ChangePassword, EditClinicDto, EditDoctor, EditEmployes, EditMasterService, ForceChangePassword, MasterService, NewDoctor, NewEmpolye } from './dto';
import { ClinicService } from './clinic.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class ClinicController {
    private clinicService;
    private jwtService;
    private Config;
    constructor(clinicService: ClinicService, jwtService: JwtService, Config: ConfigService);
    getClinic(req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editClinic(dto: EditClinicDto, req: any): Promise<import("@nestjs/common").NotFoundException | {
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
    changePassword(dto: ChangePassword, req: any): Promise<{
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
    getAllEmployes(req: any): Promise<{
        status: number;
        data: {
            clinic: {};
            employes: {}[];
        };
        message: string;
    }>;
    changePasswordReceptionist(id: string, req: any, dto: ForceChangePassword): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    changePasswordDoctor(id: string, req: any, dto: ForceChangePassword): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    changePasswordPharmacy(id: string, req: any, dto: ForceChangePassword): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    changePasswordCashier(id: string, req: any, dto: ForceChangePassword): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deleteReceptionist(id: string, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deleteDoctor(id: string, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deletePharmacy(id: string, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deleteCashier(id: string, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editReceptionist(id: string, req: any, dto: EditEmployes): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editDoctor(id: string, req: any, dto: EditDoctor): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editPharmacy(id: string, req: any, dto: EditEmployes): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editCashier(id: string, req: any, dto: EditEmployes): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getReceptionistById(id: string, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getDoctorById(id: string, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getPharmacyById(id: string, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getCashier(id: string, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getMasterService(req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getMasterServiceById(id: string, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    createMasterService(req: any, dto: MasterService): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    editMasterService(id: string, req: any, dto: EditMasterService): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    deleteMasterService(id: string, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getTransaction(id: string, req: any): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
    getTransactionById(id: string, req: any): Promise<{
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
