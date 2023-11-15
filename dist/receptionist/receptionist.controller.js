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
exports.ReceptionistController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const receptionist_service_1 = require("./receptionist.service");
const receptionist_guard_1 = require("../auth/guard/receptionist.guard");
const guard_1 = require("../auth/guard");
const global_dto_1 = require("../global-dto");
const receptionist_dto_1 = require("./dto/receptionist.dto");
let ReceptionistController = class ReceptionistController {
    constructor(ReceptionistService) {
        this.ReceptionistService = ReceptionistService;
    }
    async getUser(req) {
        return this.ReceptionistService.getUser(req);
    }
    async editUser(req, dto) {
        return this.ReceptionistService.editUser(req, dto);
    }
    async ChangePassword(req, dto) {
        return this.ReceptionistService.changePassword(req, dto);
    }
    async addPatient(dto) {
        return this.ReceptionistService.addPatient(dto);
    }
    async editPatient(id, dto) {
        return this.ReceptionistService.editPatient(parseInt(id), dto);
    }
    async getDoctor(req) {
        return this.ReceptionistService.getDoctor(req);
    }
    async addQueue(req, dto) {
        return this.ReceptionistService.addQueue(req, dto);
    }
    async searchPatient(phone) {
        return this.ReceptionistService.searchPatient(phone);
    }
    async getPatient(id) {
        return this.ReceptionistService.getPatient(parseInt(id));
    }
};
exports.ReceptionistController = ReceptionistController;
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, receptionist_guard_1.ReceptionistGuard),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReceptionistController.prototype, "getUser", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, receptionist_guard_1.ReceptionistGuard),
    (0, common_1.Patch)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, global_dto_1.EditUser]),
    __metadata("design:returntype", Promise)
], ReceptionistController.prototype, "editUser", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, receptionist_guard_1.ReceptionistGuard),
    (0, common_1.Patch)('changepassword'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, global_dto_1.ChangePassword]),
    __metadata("design:returntype", Promise)
], ReceptionistController.prototype, "ChangePassword", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, receptionist_guard_1.ReceptionistGuard),
    (0, common_1.Post)('patient'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [receptionist_dto_1.AddPatient]),
    __metadata("design:returntype", Promise)
], ReceptionistController.prototype, "addPatient", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, receptionist_guard_1.ReceptionistGuard),
    (0, common_1.Patch)('patient/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, receptionist_dto_1.EditPatient]),
    __metadata("design:returntype", Promise)
], ReceptionistController.prototype, "editPatient", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, receptionist_guard_1.ReceptionistGuard),
    (0, common_1.Get)('doctor'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReceptionistController.prototype, "getDoctor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, receptionist_guard_1.ReceptionistGuard),
    (0, common_1.Post)('queue'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, receptionist_dto_1.AddQueue]),
    __metadata("design:returntype", Promise)
], ReceptionistController.prototype, "addQueue", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, receptionist_guard_1.ReceptionistGuard),
    (0, common_1.Get)('patient/:phone'),
    __param(0, (0, common_1.Param)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReceptionistController.prototype, "searchPatient", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, receptionist_guard_1.ReceptionistGuard),
    (0, common_1.Get)('patientid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReceptionistController.prototype, "getPatient", null);
exports.ReceptionistController = ReceptionistController = __decorate([
    (0, common_1.Controller)('receptionist'),
    (0, swagger_1.ApiTags)('receptionist'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [receptionist_service_1.ReceptionistService])
], ReceptionistController);
//# sourceMappingURL=receptionist.controller.js.map