"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionById = exports.getAllTransaction = exports.getAllEmployes = exports.ClinicResponse = void 0;
const ClinicResponse = (status, data, message) => {
    return {
        status,
        data,
        message,
    };
};
exports.ClinicResponse = ClinicResponse;
const getAllEmployes = (status, clinic, employes, message) => {
    return {
        status,
        data: {
            clinic,
            employes: [employes],
        },
        message,
    };
};
exports.getAllEmployes = getAllEmployes;
const getAllTransaction = (status, data, message) => {
    return {
        status,
        transaction: [data],
        message,
    };
};
exports.getAllTransaction = getAllTransaction;
const getTransactionById = (status, transaction, patient, receptionist, doctor, pharmacy, cashier, service, message) => {
    return {
        status,
        data: {
            ...transaction,
            patient,
            doctor,
            receptionist,
            pharmacy,
            cashier,
            service: [...service],
        },
        message,
    };
};
exports.getTransactionById = getTransactionById;
//# sourceMappingURL=clinic.response.js.map