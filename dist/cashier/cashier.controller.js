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
exports.CashierController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../auth/guard");
const global_dto_1 = require("../global-dto");
const cashier_service_1 = require("./cashier.service");
let CashierController = class CashierController {
    constructor(CashierService) {
        this.CashierService = CashierService;
    }
    async getDoctor(req) {
        return this.CashierService.getUser(req);
    }
    async editDoctor(req, dto) {
        return this.CashierService.editCashier(req, dto);
    }
    async changePassword(req, dto) {
        return this.CashierService.changePassword(req, dto);
    }
    async getQueue(req) {
        return this.CashierService.getQueue(req);
    }
    async getMedicalHistory(id, req) {
        return this.CashierService.getMedicalHistory(parseInt(id), req);
    }
    async getDone(id, req) {
        return this.CashierService.getDone(parseInt(id), req);
    }
};
exports.CashierController = CashierController;
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.CashierGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CashierController.prototype, "getDoctor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.CashierGuard),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, global_dto_1.EditUser]),
    __metadata("design:returntype", Promise)
], CashierController.prototype, "editDoctor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.CashierGuard),
    (0, common_1.Patch)('changepassword'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, global_dto_1.ChangePassword]),
    __metadata("design:returntype", Promise)
], CashierController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.CashierGuard),
    (0, common_1.Get)('queue'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CashierController.prototype, "getQueue", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.CashierGuard),
    (0, common_1.Get)('medicalhistory/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CashierController.prototype, "getMedicalHistory", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, guard_1.CashierGuard),
    (0, common_1.Patch)('medicalhistory/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CashierController.prototype, "getDone", null);
exports.CashierController = CashierController = __decorate([
    (0, common_1.Controller)('cashier'),
    (0, swagger_1.ApiTags)('cashier'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [cashier_service_1.CashierService])
], CashierController);
//# sourceMappingURL=cashier.controller.js.map