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
exports.PharmacyService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const response_1 = require("../response");
const argon = require("argon2");
let PharmacyService = class PharmacyService {
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
        const user = await this.prisma.pharmacy.findUnique({
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
    async editPharmacy(req, dto) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const iuser = await this.prisma.pharmacy.findUnique({
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
        const user = await this.prisma.pharmacy.update({
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
        const iuser = await this.prisma.pharmacy.findUnique({
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
        const user = await this.prisma.pharmacy.update({
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
        const user = await this.prisma.pharmacy.findUnique({
            where: {
                id: payload.sub,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('anda tidak terdaftar dalam klinik');
        }
        const clinic = await this.prisma.clinic.findUnique({
            where: {
                id: user.clinic_id,
            },
        });
        const id = clinic.id;
        const queue = await this.prisma.medical_History.findMany({
            where: {
                clinic_id: id,
                status: 'on_pharmacy',
            },
            orderBy: {
                created_at: 'asc',
            },
        });
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
        if (queue.length < 1) {
            return (0, response_1.QueueResponse)(404, 0, `tidak ada antiran untuk saat ini`);
        }
        return (0, response_1.QueueResponse)(200, queues, `berhasil mendapatkan antrian`);
    }
    async getService(req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const id = payload.sub;
        const pharmacy = await this.prisma.pharmacy.findUnique({
            where: {
                id,
            },
        });
        const services = await this.prisma.master_Service.findMany({
            where: {
                clinic_id: pharmacy.clinic_id,
                is_deleted: false,
                type: 'medicine',
            },
        });
        if (services.length < 1) {
            throw new common_1.NotFoundException('tidak ada service terkini , harap minta kepada admin untuk menambahkannya');
        }
        return (0, response_1.ServiceResponse)(200, services, 'berhasil mendaptkan seluruh service pada clinic');
    }
    async addService(dto) {
        try {
            const service = await this.prisma.service.create({
                data: {
                    ...dto,
                },
            });
            return (0, response_1.UserResponse)(200, service, null, 'berhasil menambahkan service');
        }
        catch (error) {
            throw new common_1.BadRequestException('gagal menambahkan service');
        }
    }
    async editMedicalHistory(id, req, dto) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        if (dto.medicine.length < 1) {
            delete dto.medicine;
        }
        try {
            const medicalhistory = await this.prisma.medical_History.update({
                where: {
                    id,
                },
                data: {
                    ...dto,
                    pharmacy_id: payload.sub,
                    status: 'on_cashier',
                },
            });
            return (0, response_1.UserResponse)(200, medicalhistory, medicalhistory.clinic_id, 'berhasil menambahkan catatan dan obat pada riwayat pengobatan');
        }
        catch (error) {
            throw new common_1.BadGatewayException('gagal menngubah riwayat pengobatan');
        }
    }
};
exports.PharmacyService = PharmacyService;
exports.PharmacyService = PharmacyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], PharmacyService);
//# sourceMappingURL=pharmacy.service.js.map