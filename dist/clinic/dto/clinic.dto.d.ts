export declare class EditClinicDto {
    name?: string;
    address?: string;
    owner?: string;
    phone?: string;
}
export declare class ChangePassword {
    oldPassword: string;
    newPassword: string;
    confPassword: string;
}
export declare class ForceChangePassword {
    newPassword: string;
    confPassword: string;
}
export declare class NewDoctor {
    name: string;
    email: string;
    password: string;
    confPassword: string;
    price?: number;
    specialist?: string;
}
export declare class NewEmpolye {
    name: string;
    email: string;
    password: string;
    confPassword: string;
}
export declare class EditEmployes {
    name?: string;
    email?: string;
}
export declare class EditDoctor {
    name?: string;
    email?: string;
    price?: number;
    specialist?: string;
}
export declare class MasterService {
    name: string;
    price: number;
    type: 'registration' | 'service' | 'medicine';
}
export declare class EditMasterService {
    name?: string;
    type?: 'registration' | 'service' | 'medicine';
    price?: number;
}
