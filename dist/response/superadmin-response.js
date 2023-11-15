"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewData = exports.SuperAdminLoginResponse = exports.SuperAdminResponse = void 0;
const SuperAdminResponse = (status, data, message) => {
    return {
        status,
        data,
        message,
    };
};
exports.SuperAdminResponse = SuperAdminResponse;
const SuperAdminLoginResponse = (status, data, message, role) => {
    return {
        status,
        data,
        message,
        role,
    };
};
exports.SuperAdminLoginResponse = SuperAdminLoginResponse;
const NewData = (status, data, message, role) => {
    return {
        status,
        data,
        message,
        role,
    };
};
exports.NewData = NewData;
//# sourceMappingURL=superadmin-response.js.map