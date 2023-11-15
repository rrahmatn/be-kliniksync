import { DoctorService } from './doctor.service';
import { ChangePassword, EditUser } from 'src/global-dto';
import { AddService, EditMedicalHistory } from './dto';
export declare class DoctorController {
    private DoctorService;
    constructor(DoctorService: DoctorService);
    getDoctor(req: any): Promise<{
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
    editMedicalHistory(id: string, dto: EditMedicalHistory): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
    getPatient(id: string): Promise<{
        status: number;
        data: {
            patient: {};
            medical_history: {}[];
        };
        message: string;
    }>;
    getMedicalHistoryById(id: string): Promise<{
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
}
