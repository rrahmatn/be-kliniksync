export declare const ClinicResponse: (status: number, data: {}, message: string) => {
    status: number;
    data: {};
    message: string;
};
export declare const getAllEmployes: (status: number, clinic: {}, employes: {}, message: string) => {
    status: number;
    data: {
        clinic: {};
        employes: {}[];
    };
    message: string;
};
export declare const getAllTransaction: (status: number, data: {}, message: string) => {
    status: number;
    transaction: {}[];
    message: string;
};
export declare const getTransactionById: (status: number, transaction: {}, patient: {}, receptionist: {}, doctor: {}, pharmacy: {}, cashier: {}, service: any[], message: string) => {
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
};
