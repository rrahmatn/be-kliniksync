"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientResponse = void 0;
const PatientResponse = (status, data, clinic, patient, doctor, receptionist, service, message) => {
    return {
        status,
        data: {
            ...data,
            clinic,
            patient,
            service,
            doctor,
            receptionist,
        },
        message
    };
};
exports.PatientResponse = PatientResponse;
//# sourceMappingURL=doctor.response.js.map