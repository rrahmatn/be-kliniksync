export declare const UserResponse: (status: number, data: {}, clinic_id: number | null, message: string) => {
    status: number;
    data: {};
    clinic_id: number;
    message: string;
};
export declare const QueueResponse: (status: number, data: {}, message: string) => {
    status: number;
    queue: {};
    message: string;
};
export declare const ServiceResponse: (status: number, data: {}, message: string) => {
    status: number;
    service: {};
    message: string;
};
export declare const GetPatient: (status: number, patient: {}, data: {}, message: string) => {
    status: number;
    data: {
        patient: {};
        medical_history: {};
    };
    message: string;
};
export declare const CashierResponse: (status: number, data: {}, clinic: {}, patient: {}, doctor: {}, pharmacy: {}, services: {}, total: number, message: string) => {
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
};
