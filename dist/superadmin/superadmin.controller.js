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
exports.SuperAdminController = void 0;
const common_1 = require("@nestjs/common");
const superadmin_service_1 = require("./superadmin.service");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../auth/guard");
const dto_1 = require("../auth/dto");
const dto_2 = require("./dto");
let SuperAdminController = class SuperAdminController {
    constructor(superAdminService) {
        this.superAdminService = superAdminService;
    }
    createSuperAdmin(dto) {
        return this.superAdminService.createSuperAdmin(dto);
    }
    deleteSuperAdmin(id) {
        return this.superAdminService.deleteSuperAdmin(parseInt(id));
    }
    editSuperAdmin(req, dto) {
        return this.superAdminService.editSuperAdmin(req, dto);
    }
    editClinic(id, dto) {
        return this.superAdminService.editClinic(parseInt(id), dto);
    }
    deleteClinic(id) {
        return this.superAdminService.deleteClinic(parseInt(id));
    }
    createNewClinic(dto) {
        return this.superAdminService.createNewClinic(dto);
    }
    getAllClinic() {
        return this.superAdminService.getAllClinic();
    }
    getClinicById(id) {
        return this.superAdminService.getClinicById(parseInt(id));
    }
    clinicPayment(id) {
        return this.superAdminService.clinicPayment(parseInt(id));
    }
    changePasswordClini(id, dto) {
        return this.superAdminService.changePasswordClinic(parseInt(id), dto);
    }
};
exports.SuperAdminController = SuperAdminController;
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SuperAdminDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "createSuperAdmin", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.SuperAdminGuard, guard_1.JwtGuard),
    (0, common_1.Patch)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "deleteSuperAdmin", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.SuperAdminGuard, guard_1.JwtGuard),
    (0, common_1.Patch)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_2.EditSuperAdminDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "editSuperAdmin", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.SuperAdminGuard, guard_1.JwtGuard),
    (0, common_1.Patch)('clinic/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_2.EditClinic]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "editClinic", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.SuperAdminGuard, guard_1.JwtGuard),
    (0, common_1.Patch)('clinic/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "deleteClinic", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.SuperAdminGuard),
    (0, common_1.Post)('clinic'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.CreateNewClinicDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "createNewClinic", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.SuperAdminGuard),
    (0, common_1.Get)('clinic'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getAllClinic", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.SuperAdminGuard),
    (0, common_1.Get)('clinic/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getClinicById", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.SuperAdminGuard),
    (0, common_1.Patch)('clinic/payment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "clinicPayment", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.SuperAdminGuard),
    (0, common_1.Patch)('clinic/changepassword/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_2.ChangePasswordClinic]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "changePasswordClini", null);
exports.SuperAdminController = SuperAdminController = __decorate([
    (0, common_1.Controller)('superadmin'),
    (0, swagger_1.ApiTags)('superadmin'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [superadmin_service_1.SuperAdminService])
], SuperAdminController);
//# sourceMappingURL=superadmin.controller.js.map