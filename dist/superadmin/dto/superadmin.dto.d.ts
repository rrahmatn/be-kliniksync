export declare class EditSuperAdminDto {
    name?: string;
    email?: string;
    password: string;
}
export declare class ChangePasswordSuperAdmin {
    oldPassword: string;
    newPassword: string;
    confPassword: string;
}
export declare class ChangePasswordClinic {
    newPassword: string;
    confPassword: string;
}
export declare class EditClinic {
    name?: string;
    email?: string;
    owner?: string;
    phone?: string;
    address?: string;
    type?: 'premium' | 'regular';
    expired_at?: string;
}
export declare class CreateNewClinicDto {
    name: string;
    owner: string;
    phone: string;
    email: string;
    password: string;
    confPassword: string;
    address: string;
    type: 'regular' | 'premium';
    expired_at?: string;
}
