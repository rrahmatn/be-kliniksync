export declare class AddPatient {
    nik: string;
    name: string;
    phone: string;
    address: string;
    birth_date: string;
    gender: 'laki-laki' | 'perempuan';
}
export declare class EditPatient {
    nik?: string;
    name?: string;
    phone?: string;
    address?: string;
    birth_date?: string;
    gender?: 'laki-laki' | 'perempuan';
}
export declare class AddQueue {
    id_patient: number;
    id_doctor: number;
}
