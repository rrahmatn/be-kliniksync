import { ChangePassword, EditUser } from 'src/global-dto';
import { CashierService } from './cashier.service';
export declare class CashierController {
    private CashierService;
    constructor(CashierService: CashierService);
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
    getMedicalHistory(id: string, req: any): Promise<{
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
    getDone(id: string, req: any): Promise<{
        status: number;
        data: {};
        clinic_id: number;
        message: string;
    }>;
}
