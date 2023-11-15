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
exports.PharmacyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pharmacy_service_1 = require("./pharmacy.service");
const guard_1 = require("../auth/guard");
const global_dto_1 = require("../global-dto");
const dto_1 = require("../doctor/dto");
let PharmacyController = class PharmacyController {
    constructor(PharmacyServices) {
        this.PharmacyServices = PharmacyServices;
    }
    async getPharmacy(req) {
        return this.PharmacyServices.getUser(req);
    }
    async editPharmacy(req, dto) {
        return this.PharmacyServices.editPharmacy(req, dto);
    }
    async changePasswordPharmacy(req, dto) {
        return this.PharmacyServices.changePassword(req, dto);
    }
    async getQueue(req) {
        return this.PharmacyServices.getQueue(req);
    }
    async getService(req) {
        return this.PharmacyServices.getService(req);
    }
    async addService(req) {
        return this.PharmacyServices.addService(req);
    }
    async editMEdicalHistory(id, req, dto) {
        return this.PharmacyServices.editMedicalHistory(parseInt(id), req, dto);
    }
};
exports.PharmacyController = PharmacyController;
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.PharmacyGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "getPharmacy", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.PharmacyGuard),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, global_dto_1.EditUser]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "editPharmacy", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.PharmacyGuard),
    (0, common_1.Patch)('changepassword'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, global_dto_1.ChangePassword]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "changePasswordPharmacy", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.PharmacyGuard),
    (0, common_1.Get)('queue'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "getQueue", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.PharmacyGuard),
    (0, common_1.Get)('service'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "getService", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.PharmacyGuard),
    (0, common_1.Post)('service'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "addService", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.PharmacyGuard),
    (0, common_1.Patch)('medicalhistory/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.EditMedicalHistoryPharmacy]),
    __metadata("design:returntype", Promise)
], PharmacyController.prototype, "editMEdicalHistory", null);
exports.PharmacyController = PharmacyController = __decorate([
    (0, common_1.Controller)('pharmacy'),
    (0, swagger_1.ApiTags)('pharmacy'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [pharmacy_service_1.PharmacyService])
], PharmacyController);
//# sourceMappingURL=pharmacy.controller.js.map