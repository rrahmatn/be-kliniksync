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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashierService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const response_1 = require("../response");
const argon = require("argon2");
let CashierService = class CashierService {
    constructor(prisma, jwtService, config) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
    }
    async getUser(req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const id = payload.sub;
        const user = await this.prisma.cashier.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('user tidak ditemukan');
        }
        delete user.password;
        delete user.is_deleted;
        return (0, response_1.UserResponse)(200, user, user.clinic_id, `berhasil mendapatkan data ${user.name}`);
    }
    async editCashier(req, dto) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const iuser = await this.prisma.cashier.findUnique({
            where: {
                id: payload.sub,
            },
        });
        const id = payload.sub;
        if (!iuser) {
            throw new common_1.NotFoundException('user tidak ditemukan');
        }
        const matches = await argon.verify(iuser.password, dto.password);
        if (!matches) {
            throw new common_1.BadRequestException('password salah');
        }
        const user = await this.prisma.cashier.update({
            where: {
                id,
            },
            data: {
                name: dto.name,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('user tidak ditemukan');
        }
        return (0, response_1.UserResponse)(200, user, user.clinic_id, `berhasil mengubah data ${user.name}`);
    }
    async changePassword(req, dto) {
        if (dto.newPassword !== dto.confPassword) {
            throw new common_1.BadRequestException('password baru dan confirm password tidak sama');
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const iuser = await this.prisma.cashier.findUnique({
            where: {
                id: payload.sub,
            },
        });
        const id = payload.sub;
        const matches = await argon.verify(iuser.password, dto.oldPassword);
        if (!matches) {
            throw new common_1.BadRequestException('password lama salah , jikan anda lupa password anda silahkan tanyakan kepada admin');
        }
        const password = await argon.hash(dto.newPassword);
        const user = await this.prisma.cashier.update({
            where: {
                id: payload.sub,
            },
            data: {
                password,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException();
        }
        return (0, response_1.UserResponse)(204, user, user.clinic_id, `berhasil mengganti password ${user.name}`);
    }
    async getQueue(req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const user = await this.prisma.cashier.findUnique({
            where: {
                id: payload.sub,
            },
        });
        const clinic = await this.prisma.clinic.findUnique({
            where: {
                id: user.clinic_id,
            },
        });
        const queue = await this.prisma.medical_History.findMany({
            where: {
                clinic_id: clinic.id,
                status: 'on_cashier',
            },
            orderBy: {
                created_at: 'asc',
            },
        });
        if (queue.length < 1) {
            return (0, response_1.QueueResponse)(404, 0, `tidak ada antiran untuk saat ini`);
        }
        let queues = [];
        await Promise.all(queue.map(async (e) => {
            const patient = await this.prisma.patient.findUnique({
                where: {
                    id: e.patient_id,
                },
            });
            if (patient) {
                queues.push({
                    name: patient.name,
                    address: patient.address,
                    gender: patient.gender,
                    data: e,
                });
            }
            else {
                console.error(`Patient not found for medical history with id ${e.id}`);
            }
        }));
        return (0, response_1.QueueResponse)(200, queues, `berhasil mendapatkan antrian`);
    }
    async getMedicalHistory(id, req) {
        const medicalHistory = await this.prisma.medical_History.findUnique({
            where: {
                id,
            },
        });
        const clinic = await this.prisma.clinic.findUnique({
            where: {
                id: medicalHistory.clinic_id,
            },
        });
        delete clinic.password;
        delete clinic.password;
        const patient = await this.prisma.patient.findUnique({
            where: {
                id: medicalHistory.patient_id,
            },
        });
        const doctor = await this.prisma.doctor.findUnique({
            where: {
                id: medicalHistory.doctor_id,
            },
        });
        delete doctor.password;
        delete doctor.is_deleted;
        const pharmacy = await this.prisma.pharmacy.findUnique({
            where: {
                id: medicalHistory.pharmacy_id,
            },
        });
        delete pharmacy.password;
        delete pharmacy.is_deleted;
        const service = await this.prisma.service.findMany({
            where: {
                medical_history_id: medicalHistory.id,
            },
        });
        let total = [];
        await Promise.all(service.map(async (e) => {
            const master = await this.prisma.master_Service.findUnique({
                where: {
                    id: e.master_service_id,
                },
            });
            total.push({
                name: master.name,
                price: master.price,
            });
        }));
        let totalPayment = total.reduce((sum, item) => sum + item.price, 0);
        return (0, response_1.CashierResponse)(200, medicalHistory, patient, clinic, doctor, pharmacy, total, totalPayment, `berhasil mendapatkan semua tagihan ${patient.name}`);
    }
    async getDone(id, req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const user = await this.prisma.cashier.findUnique({
            where: {
                id: payload.sub,
            },
        });
        const medicalHistory = await this.prisma.medical_History.findUnique({
            where: {
                id,
            },
        });
        if (medicalHistory.clinic_id !== user.clinic_id) {
            throw new common_1.ForbiddenException('anda tidak punya akses untuk menyelesaikan pembayaran klinik orang lain');
        }
        try {
            const patient = await this.prisma.medical_History.update({
                where: {
                    id,
                },
                data: {
                    status: 'done',
                },
            });
            return (0, response_1.UserResponse)(200, patient, user.clinic_id, `berhasil melakuakan pembayaran`);
        }
        catch (error) {
            throw new common_1.BadGatewayException(error);
        }
    }
};
exports.CashierService = CashierService;
exports.CashierService = CashierService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], CashierService);
//# sourceMappingURL=cashier.service.js.map