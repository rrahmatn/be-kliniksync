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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const doctor_service_1 = require("./doctor.service");
const guard_1 = require("../auth/guard");
const global_dto_1 = require("../global-dto");
const dto_1 = require("./dto");
let DoctorController = class DoctorController {
    constructor(DoctorService) {
        this.DoctorService = DoctorService;
    }
    async getDoctor(req) {
        return this.DoctorService.getUser(req);
    }
    async editDoctor(req, dto) {
        return this.DoctorService.editDoctor(req, dto);
    }
    async changePassword(req, dto) {
        return this.DoctorService.changePassword(req, dto);
    }
    async getQueue(req) {
        return this.DoctorService.getQueue(req);
    }
    async getService(req) {
        return this.DoctorService.getService(req);
    }
    async addService(dto) {
        return this.DoctorService.addService(dto);
    }
    async editMedicalHistory(id, dto) {
        return this.DoctorService.editMedicalHistory(parseInt(id), dto);
    }
    async getPatient(id) {
        return this.DoctorService.getPatient(parseInt(id));
    }
    async getMedicalHistoryById(id) {
        return this.DoctorService.getMedicalHistoryById(parseInt(id));
    }
    async getActive(req, status) {
        let inistatus;
        if (status === 'true') {
            inistatus = true;
        }
        else if (status === 'false') {
            inistatus = false;
        }
        else {
            throw new common_1.BadRequestException('gagal update data');
        }
        return this.DoctorService.getActive(req, inistatus);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.DoctorGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.DoctorGuard),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, global_dto_1.EditUser]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "editDoctor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.DoctorGuard),
    (0, common_1.Patch)('changepassword'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, global_dto_1.ChangePassword]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.DoctorGuard),
    (0, common_1.Get)('queue'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getQueue", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.DoctorGuard),
    (0, common_1.Get)('service'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getService", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.DoctorGuard),
    (0, common_1.Post)('service'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AddService]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "addService", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.DoctorGuard),
    (0, common_1.Patch)('medicalhistory/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.EditMedicalHistory]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "editMedicalHistory", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.DoctorGuard),
    (0, common_1.Get)('patient/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getPatient", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.DoctorGuard),
    (0, common_1.Get)('medicalhistory/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getMedicalHistoryById", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.DoctorGuard),
    (0, common_1.Get)('getactive/:status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getActive", null);
exports.DoctorController = DoctorController = __decorate([
    (0, common_1.Controller)('doctor'),
    (0, swagger_1.ApiTags)('doctor'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map