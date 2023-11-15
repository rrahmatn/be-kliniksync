"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashierResponse = exports.GetPatient = exports.ServiceResponse = exports.QueueResponse = exports.UserResponse = void 0;
const UserResponse = (status, data, clinic_id, message) => {
    return {
        status,
        data,
        clinic_id,
        message,
    };
};
exports.UserResponse = UserResponse;
const QueueResponse = (status, data, message) => {
    return {
        status,
        queue: data,
        message,
    };
};
exports.QueueResponse = QueueResponse;
const ServiceResponse = (status, data, message) => {
    return {
        status,
        service: data,
        message,
    };
};
exports.ServiceResponse = ServiceResponse;
const GetPatient = (status, patient, data, message) => {
    return {
        status,
        data: {
            patient,
            medical_history: [data]
        },
        message
    };
};
exports.GetPatient = GetPatient;
const CashierResponse = (status, data, clinic, patient, doctor, pharmacy, services, total, message) => {
    return {
        status,
        data: {
            data,
            patient,
            clinic,
            doctor,
            pharmacy,
            services,
            total,
        },
        message
    };
};
exports.CashierResponse = CashierResponse;
//# sourceMappingURL=user.response.js.map