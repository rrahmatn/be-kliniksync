import { PharmacyService } from './pharmacy.service';
import { ChangePassword, EditUser } from 'src/global-dto';
import { EditMedicalHistoryPharmacy } from 'src/doctor/dto';
import { AddServiceDto } from './dto';
export declare class PharmacyController {
    private PharmacyServices;
    constructor(PharmacyServices: PharmacyService);
    getPharmacy(req: any): Promise<{
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
    changePasswordPharmacy(req: any, dto: ChangePassword): Promise<{
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
    addService(dto: AddServiceDto): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
    editMEdicalHistory(id: string, req: any, dto: EditMedicalHistoryPharmacy): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
}
