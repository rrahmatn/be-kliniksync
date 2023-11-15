"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const service_controller_1 = require("./service/service.controller");
const clinic_module_1 = require("./clinic/clinic.module");
const superadmin_module_1 = require("./superadmin/superadmin.module");
const receptionist_module_1 = require("./receptionist/receptionist.module");
const doctor_module_1 = require("./doctor/doctor.module");
const pharmacy_module_1 = require("./pharmacy/pharmacy.module");
const cashier_module_1 = require("./cashier/cashier.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            clinic_module_1.ClinicModule,
            superadmin_module_1.SuperadminModule,
            receptionist_module_1.ReceptionistModule,
            doctor_module_1.DoctorModule,
            pharmacy_module_1.PharmacyModule,
            cashier_module_1.CashierModule,
        ],
        controllers: [service_controller_1.ServiceController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map