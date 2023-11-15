import { ReceptionistService } from './receptionist.service';
import { ChangePassword, EditUser } from 'src/global-dto';
import { AddPatient, AddQueue, EditPatient } from './dto/receptionist.dto';
export declare class ReceptionistController {
    private ReceptionistService;
    constructor(ReceptionistService: ReceptionistService);
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
    ChangePassword(req: any, dto: ChangePassword): Promise<{
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
    editPatient(id: string, dto: EditPatient): Promise<{
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
    getPatient(id: string): Promise<{
        status: number;
        data: {};
        message: string;
    }>;
}
