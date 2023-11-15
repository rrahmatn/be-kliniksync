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
exports.SuperAdminService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const response_1 = require("../response");
const library_1 = require("@prisma/client/runtime/library");
let SuperAdminService = class SuperAdminService {
    constructor(prisma, jwtService, config, AuthService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
        this.AuthService = AuthService;
    }
    async createSuperAdmin(dto) {
        const checkEmail = await this.AuthService.checkEmail(dto.email, '');
        if (!checkEmail) {
            throw new common_1.BadRequestException('email sudah terdaftar');
        }
        if (dto.password !== dto.confPassword)
            return { status: 401, msg: 'password tidak cocok' };
        try {
            const hash = await argon.hash(dto.password);
            const newAdmin = await this.prisma.superAdmin.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hash,
                },
            });
            delete newAdmin.password;
            return (0, response_1.SuperAdminResponse)(201, newAdmin, 'Admin Baru Telah Ditambahkan');
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException({
                        status: 403,
                        msg: 'email sudah terdafar',
                        errorr: error.code,
                    });
                }
            }
            throw error;
        }
    }
    async editSuperAdmin(req, dto) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = parseInt(payload.sub);
        const superAdmin = await this.prisma.superAdmin.findUnique({
            where: {
                id: idClinic,
            },
        });
        if (dto.email) {
            const checkEmail = await this.AuthService.checkEmail(dto.email, superAdmin.email);
            if (!checkEmail) {
                throw new common_1.BadRequestException('email sudah terdaftar');
            }
        }
        else {
            delete dto.email;
        }
        if (!superAdmin) {
            throw new common_1.NotFoundException('super admin tidak ditemukan');
        }
        const superAdminPassword = await argon.verify(superAdmin.password, dto.password);
        if (!superAdminPassword) {
            throw new common_1.BadRequestException('password salah');
        }
        delete dto.password;
        const user = await this.prisma.superAdmin.update({
            where: {
                id: idClinic,
            },
            data: {
                ...dto,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException(' ');
        }
        delete user.password;
        delete user.is_deleted;
        return (0, response_1.SuperAdminResponse)(204, user, 'berhasil mengubah data');
    }
    async deleteSuperAdmin(id) {
        const deletedSuperAdmin = await this.prisma.superAdmin.update({
            where: {
                id: id,
            },
            data: {
                is_deleted: true,
            },
        });
        if (!deletedSuperAdmin) {
            throw new common_1.NotFoundException({
                status: 404,
                message: 'akun tidak ditemukan',
            });
        }
        delete deletedSuperAdmin.password;
        delete deletedSuperAdmin.is_deleted;
        return (0, response_1.SuperAdminResponse)(204, deletedSuperAdmin, `berhasil menghapus super admin ${deletedSuperAdmin.name}`);
    }
    async createNewClinic(dto) {
        if (dto.type.toLocaleLowerCase() !== 'regular' &&
            dto.type.toLocaleLowerCase() !== 'premium') {
            throw new common_1.ForbiddenException('type harus bernilai dengan regular atau premium');
        }
        const checkEmail = await this.AuthService.checkEmail(dto.email);
        if (!checkEmail) {
            throw new common_1.BadRequestException('Email sudah digunakan , silahkan gunakan alamat email yang lain');
        }
        if (dto.password !== dto.confPassword)
            throw new common_1.ForbiddenException('password tidak sama');
        const hash = await argon.hash(dto.password);
        const expired_at = new Date(dto.expired_at);
        delete dto.password;
        delete dto.expired_at;
        delete dto.confPassword;
        try {
            const newClinic = await this.prisma.clinic.create({
                data: {
                    expired_at,
                    password: hash,
                    ...dto,
                },
            });
            return newClinic;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error);
        }
    }
    async editClinic(id, dto) {
        if (dto.type.toLocaleLowerCase() !== 'regular' &&
            dto.type.toLocaleLowerCase() !== 'premium') {
            throw new common_1.ForbiddenException('type harus bernilai dengan regular atau premium');
        }
        const findClinic = await this.prisma.clinic.findUnique({
            where: {
                id: id,
                is_deleted: false,
            },
        });
        if (!findClinic) {
            throw new common_1.NotFoundException({
                status: 404,
                message: 'akun klinik tidak ditemukan',
            });
        }
        if (dto.email) {
            const checkEmail = await this.AuthService.checkEmail(dto.email, findClinic.email);
            if (!checkEmail) {
                throw new common_1.BadRequestException('Email sudah digunakan , silahkan gunakan alamat email yang lain');
            }
        }
        let expired_at;
        if (!dto.expired_at) {
            delete dto.expired_at;
        }
        else {
            expired_at = new Date(dto.expired_at);
        }
        delete dto.expired_at;
        const clinic = await this.prisma.clinic.update({
            where: {
                id: id,
            },
            data: {
                expired_at: expired_at,
                ...dto,
            },
        });
        delete clinic.password;
        return (0, response_1.SuperAdminResponse)(204, clinic, `berhasil mengubah ${clinic.name}`);
    }
    async deleteClinic(id) {
        const clinic = await this.prisma.clinic.update({
            where: {
                id: id,
            },
            data: {
                is_deleted: true,
            },
        });
        if (!clinic) {
            throw new common_1.NotFoundException('klinik tidak ditemukan');
        }
        return (0, response_1.SuperAdminResponse)(204, clinic, `berhasil menghapus klinik ${clinic.name}`);
    }
    async getPaymentClinic(id) {
        const paymentCount = await this.prisma.medical_History.count({
            where: {
                clinic_id: id,
                status: 'done',
                payment_status: false,
            },
        });
        if (paymentCount === 0) {
            return (0, response_1.SuperAdminResponse)(200, { message: ' klinik sudah menyelesaikan semua pembayaran ' }, 'klinik sudah menyelesaikan semua pembayaran');
        }
        return (0, response_1.SuperAdminResponse)(200, { tagihan: paymentCount }, ' berhasil mendapatkan tagihan di clinic');
    }
    async getAllClinic() {
        const paraClinic = await this.prisma.clinic.findMany({
            where: {
                is_deleted: false,
            },
        });
        if (paraClinic.length < 1) {
            throw new common_1.NotFoundException('tidak ada data klinik');
        }
        return (0, response_1.SuperAdminResponse)(200, paraClinic, 'berhasil mendapatkan semua klinik');
    }
    async getClinicById(id) {
        const clinic = await this.prisma.clinic.findUnique({
            where: {
                id: id,
                is_deleted: false,
            },
        });
        const paymentCount = await this.prisma.medical_History.count({
            where: {
                clinic_id: id,
                status: 'done',
                payment_status: false,
            },
        });
        const data = {
            clinic,
            paymentCount,
        };
        if (!clinic) {
            throw new common_1.NotFoundException('data klinik tidak ditemukan');
        }
        return (0, response_1.SuperAdminResponse)(200, data, `berhasil mendapatkan ${clinic.name}`);
    }
    async clinicPayment(id) {
        const clinic = await this.prisma.medical_History.updateMany({
            where: {
                clinic_id: id,
                payment_status: false,
                status: 'done',
            },
            data: {
                payment_status: true,
            },
        });
        if (!clinic) {
            throw new common_1.NotFoundException('klinik sudah membayar seluruh tagihan');
        }
        return (0, response_1.SuperAdminResponse)(200, clinic, 'selesai menghapus seluruh tagihan untuk klinik terkait');
    }
    async changePasswordClinic(id, dto) {
        if (dto.confPassword !== dto.newPassword) {
            throw new common_1.BadRequestException('password dan confirm password harus sama');
        }
        const hash = await argon.hash(dto.newPassword);
        try {
            const clinic = await this.prisma.clinic.update({
                where: {
                    id: id,
                },
                data: {
                    password: hash,
                },
            });
            return (0, response_1.SuperAdminResponse)(204, clinic, `berhasil mengubah password ${clinic.name}`);
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
};
exports.SuperAdminService = SuperAdminService;
exports.SuperAdminService = SuperAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        auth_service_1.AuthService])
], SuperAdminService);
//# sourceMappingURL=superadmin.service.js.map