"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceptionistModule = void 0;
const common_1 = require("@nestjs/common");
const receptionist_controller_1 = require("./receptionist.controller");
const receptionist_service_1 = require("./receptionist.service");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
let ReceptionistModule = class ReceptionistModule {
};
exports.ReceptionistModule = ReceptionistModule;
exports.ReceptionistModule = ReceptionistModule = __decorate([
    (0, common_1.Module)({
        controllers: [receptionist_controller_1.ReceptionistController],
        providers: [receptionist_service_1.ReceptionistService, jwt_1.JwtService, auth_service_1.AuthService]
    })
], ReceptionistModule);
//# sourceMappingURL=receptionist.module.js.map