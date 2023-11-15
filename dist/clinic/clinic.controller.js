"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../auth/guard");
const dto_1 = require("./dto");
const clinic_service_1 = require("./clinic.service");
const admin_guard_1 = require("../auth/guard/admin.guard");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let ClinicController = class ClinicController {
    constructor(clinicService, jwtService, Config) {
        this.clinicService = clinicService;
        this.jwtService = jwtService;
        this.Config = Config;
    }
    async getClinic(req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.Config.get('JWT_SECRET'),
        });
        return this.clinicService.getClinic(payload.sub);
    }
    async editClinic(dto, req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.Config.get('JWT_SECRET'),
        });
        return this.clinicService.editClinic(payload.sub, dto);
    }
    async changePassword(dto, req) {
        return this.clinicService.changePassword(req, dto);
    }
    async createNewDoctor(req, dto) {
        return this.clinicService.createNewDoctor(req, dto);
    }
    async createNewReceptionist(req, dto) {
        return this.clinicService.createNewReceptionist(req, dto);
    }
    async createNewCashier(req, dto) {
        return this.clinicService.createNewCashier(req, dto);
    }
    async createNewPharmacy(req, dto) {
        return this.clinicService.createNewPharmacy(req, dto);
    }
    getAllEmployes(req) {
        return this.clinicService.getAllEmployes(req);
    }
    changePasswordReceptionist(id, req, dto) {
        return this.clinicService.changePasswordReceptionist(parseInt(id), req, dto);
    }
    changePasswordDoctor(id, req, dto) {
        return this.clinicService.changePasswordDoctor(parseInt(id), req, dto);
    }
    changePasswordPharmacy(id, req, dto) {
        return this.clinicService.changePasswordPharmacy(parseInt(id), req, dto);
    }
    changePasswordCashier(id, req, dto) {
        return this.clinicService.changePasswordCashier(parseInt(id), req, dto);
    }
    deleteReceptionist(id, req) {
        return this.clinicService.deleteReceptionist(parseInt(id), req);
    }
    deleteDoctor(id, req) {
        return this.clinicService.deleteDoctor(parseInt(id), req);
    }
    deletePharmacy(id, req) {
        return this.clinicService.deletePharmacy(parseInt(id), req);
    }
    deleteCashier(id, req) {
        return this.clinicService.deleteCashier(parseInt(id), req);
    }
    editReceptionist(id, req, dto) {
        return this.clinicService.editReceptionist(parseInt(id), req, dto);
    }
    editDoctor(id, req, dto) {
        return this.clinicService.editDoctor(parseInt(id), req, dto);
    }
    editPharmacy(id, req, dto) {
        return this.clinicService.editPharmacy(parseInt(id), req, dto);
    }
    editCashier(id, req, dto) {
        return this.clinicService.editCashier(parseInt(id), req, dto);
    }
    getReceptionistById(id, req) {
        return this.clinicService.getReceptionistById(parseInt(id), req);
    }
    getDoctorById(id, req) {
        return this.clinicService.getDoctorById(parseInt(id), req);
    }
    getPharmacyById(id, req) {
        return this.clinicService.getPharmacyById(parseInt(id), req);
    }
    getCashier(id, req) {
        return this.clinicService.getCashierById(parseInt(id), req);
    }
    getMasterService(req) {
        return this.clinicService.getAllMasterService(req);
    }
    getMasterServiceById(id, req) {
        return this.clinicService.getAllMasterServiceById(parseInt(id), req);
    }
    createMasterService(req, dto) {
        return this.clinicService.createMasterService(req, dto);
    }
    editMasterService(id, req, dto) {
        return this.clinicService.editMasterService(parseInt(id), req, dto);
    }
    deleteMasterService(id, req) {
        return this.clinicService.deleteMasterService(parseInt(id), req);
    }
    getTransaction(id, req) {
        return this.clinicService.getTransaction(parseInt(id), req);
    }
    getTransactionById(id, req) {
        return this.clinicService.getTransactionById(parseInt(id), req);
    }
};
exports.ClinicController = ClinicController;
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClinicController.prototype, "getClinic", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EditClinicDto, Object]),
    __metadata("design:returntype", Promise)
], ClinicController.prototype, "editClinic", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('changepassword'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ChangePassword, Object]),
    __metadata("design:returntype", Promise)
], ClinicController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Post)('doctor'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.NewDoctor]),
    __metadata("design:returntype", Promise)
], ClinicController.prototype, "createNewDoctor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Post)('receptionist'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.NewEmpolye]),
    __metadata("design:returntype", Promise)
], ClinicController.prototype, "createNewReceptionist", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Post)('cashier'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.NewEmpolye]),
    __metadata("design:returntype", Promise)
], ClinicController.prototype, "createNewCashier", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Post)('pharmacy'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.NewEmpolye]),
    __metadata("design:returntype", Promise)
], ClinicController.prototype, "createNewPharmacy", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)('employes'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "getAllEmployes", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('changepassword/receptionist/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.ForceChangePassword]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "changePasswordReceptionist", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('changepassword/doctor/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.ForceChangePassword]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "changePasswordDoctor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('changepassword/pharmacy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.ForceChangePassword]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "changePasswordPharmacy", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('changepassword/cashier/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.ForceChangePassword]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "changePasswordCashier", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('delete/receptionist/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "deleteReceptionist", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('delete/doctor/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "deleteDoctor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('delete/pharmacy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "deletePharmacy", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('delete/cashier/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "deleteCashier", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('edit/receptionist/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.EditEmployes]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "editReceptionist", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('edit/doctor/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.EditDoctor]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "editDoctor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('edit/pharmacy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.EditEmployes]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "editPharmacy", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('edit/pharmacy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.EditEmployes]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "editCashier", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)('receptionist/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "getReceptionistById", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)('doctor/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "getDoctorById", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)('pharmacy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "getPharmacyById", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)('cashier/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "getCashier", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)('masterservice'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "getMasterService", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)('masterservice/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "getMasterServiceById", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Post)('masterservice'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.MasterService]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "createMasterService", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('masterservice/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.EditMasterService]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "editMasterService", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Patch)('masterservice/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "deleteMasterService", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)('transaction/:page'),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "getTransaction", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)('transactionbyid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClinicController.prototype, "getTransactionById", null);
exports.ClinicController = ClinicController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, swagger_1.ApiTags)('clinic'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [clinic_service_1.ClinicService,
        jwt_1.JwtService,
        config_1.ConfigService])
], ClinicController);
//# sourceMappingURL=clinic.controller.js.map