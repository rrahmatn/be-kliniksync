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
exports.ClinicService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_service_1 = require("../auth/auth.service");
const argon = require("argon2");
const response_1 = require("../response");
const clinic_response_1 = require("../response/clinic.response");
let ClinicService = class ClinicService {
    constructor(prisma, jwtService, config, AuthService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
        this.AuthService = AuthService;
    }
    async getClinic(id) {
        const clinic = await this.prisma.clinic.findUnique({
            where: {
                id,
            },
        });
        const transaction = await this.prisma.medical_History.count({
            where: {
                clinic_id: id,
                is_deleted: false,
            },
        });
        const bill = await this.prisma.medical_History.count({
            where: {
                clinic_id: id,
                is_deleted: false,
                payment_status: false,
            },
        });
        const doctors = await this.prisma.doctor.count({
            where: {
                clinic_id: id,
                is_deleted: false,
            },
        });
        const receptionist = await this.prisma.receptionist.count({
            where: {
                clinic_id: id,
                is_deleted: false,
            },
        });
        const pharmacy = await this.prisma.pharmacy.count({
            where: {
                clinic_id: id,
                is_deleted: false,
            },
        });
        const cashier = await this.prisma.cashier.count({
            where: {
                clinic_id: id,
                is_deleted: false,
            },
        });
        if (!clinic) {
            throw new common_1.NotFoundException('clinic tidak ditemukan');
        }
        const response = {
            clinic,
            transaction,
            bill,
            doctors,
            receptionist,
            pharmacy,
            cashier,
        };
        return (0, clinic_response_1.ClinicResponse)(200, response, 'berhashil mendapatkan data');
    }
    async editClinic(id, dto) {
        try {
            const clinic = await this.prisma.clinic.update({
                where: {
                    id: id,
                },
                data: {
                    ...dto,
                },
            });
            return { message: 'berhasil mengedit klinik', data: clinic };
        }
        catch (error) {
            return new common_1.NotFoundException('clinic tidak ditemukan');
        }
    }
    async changePassword(req, dto) {
        if (dto.newPassword !== dto.confPassword) {
            throw new common_1.BadRequestException('password dan confirm password tidak sama');
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        console.log(payload);
        const user = await this.prisma.clinic.findUnique({
            where: {
                id: payload.sub,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('halo');
        }
        const pwMatches = await argon.verify(user.password, dto.oldPassword);
        if (!pwMatches) {
            throw new common_1.BadRequestException('password lama salah');
        }
        const hash = await argon.hash(dto.newPassword);
        const clinic = await this.prisma.clinic.update({
            where: {
                id: user.id,
            },
            data: {
                password: hash,
            },
        });
        return { message: 'berhasil mengganti password', data: clinic };
    }
    async getAllEmployes(req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const clinic = await this.prisma.clinic.findUnique({
            where: {
                id: payload.sub,
            },
        });
        const receptionist = await this.prisma.receptionist.findMany({
            where: {
                clinic_id: payload.sub,
                is_deleted: false,
            },
        });
        const doctor = await this.prisma.doctor.findMany({
            where: {
                clinic_id: payload.sub,
                is_deleted: false,
            },
        });
        const pharmacy = await this.prisma.pharmacy.findMany({
            where: {
                clinic_id: payload.sub,
                is_deleted: false,
            },
        });
        const cashier = await this.prisma.cashier.findMany({
            where: {
                clinic_id: payload.sub,
                is_deleted: false,
            },
        });
        let employes = [];
        await Promise.all([
            ...receptionist.map(async (e) => {
                const receptionist = {
                    id: e.id,
                    name: e.name,
                    email: e.email,
                    role: 'receptionist',
                    price: '-',
                };
                employes.push(receptionist);
            }),
            ...doctor.map(async (e) => {
                const doctors = {
                    id: e.id,
                    name: e.name,
                    email: e.email,
                    role: 'doctor',
                    price: e.price,
                };
                employes.push(doctors);
            }),
            ...pharmacy.map(async (e) => {
                const pharmacys = {
                    id: e.id,
                    name: e.name,
                    email: e.email,
                    role: 'pharmacy',
                    price: '-',
                };
                employes.push(pharmacys);
            }),
            ...cashier.map(async (e) => {
                const cashiers = {
                    id: e.id,
                    name: e.name,
                    email: e.email,
                    role: 'cashier',
                    price: '-',
                };
                employes.push(cashiers);
            }),
        ]);
        delete clinic.password;
        delete clinic.is_deleted;
        return (0, clinic_response_1.getAllEmployes)(200, clinic, employes, 'berhasil mendaptkan semua karyawan pada klinik');
    }
    async createNewDoctor(req, dto) {
        if (dto.confPassword !== dto.password) {
            throw new common_1.BadGatewayException('Password tidak sama');
        }
        const checkEmail = await this.AuthService.checkEmail(dto.email);
        if (!checkEmail) {
            throw new common_1.BadRequestException('Email sudah digunakan , silahkan gunakan alamat email yang lain');
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const hash = await argon.hash(dto.password);
        console.log(idClinic);
        delete dto.confPassword;
        delete dto.password;
        const newDoctor = await this.prisma.doctor.create({
            data: {
                clinic_id: idClinic,
                password: hash,
                ...dto,
            },
        });
        return newDoctor;
    }
    async createNewReceptionist(req, dto) {
        if (dto.confPassword !== dto.password) {
            throw new common_1.BadGatewayException('Password tidak sama');
        }
        const checkEmail = await this.AuthService.checkEmail(dto.email);
        if (!checkEmail) {
            throw new common_1.BadRequestException('Email sudah digunakan , silahkan gunakan alamat email yang lain');
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const hash = await argon.hash(dto.password);
        delete dto.password;
        delete dto.confPassword;
        const newReceptionist = await this.prisma.receptionist.create({
            data: {
                clinic_id: idClinic,
                password: hash,
                ...dto,
            },
        });
        return (0, response_1.NewData)(201, newReceptionist, 'berhasil menambahkan 1 resepsionis', 'resepsionis');
    }
    async createNewCashier(req, dto) {
        if (dto.confPassword !== dto.password) {
            throw new common_1.BadGatewayException('Password tidak sama');
        }
        const checkEmail = await this.AuthService.checkEmail(dto.email);
        if (!checkEmail) {
            throw new common_1.BadRequestException('Email sudah digunakan , silahkan gunakan alamat email yang lain');
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const hash = await argon.hash(dto.password);
        delete dto.password;
        delete dto.confPassword;
        const newReceptionist = await this.prisma.cashier.create({
            data: {
                clinic_id: idClinic,
                password: hash,
                ...dto,
            },
        });
        return (0, response_1.NewData)(201, newReceptionist, 'berhasil menambahkan 1 kasir', 'kasir');
    }
    async createNewPharmacy(req, dto) {
        if (dto.confPassword !== dto.password) {
            throw new common_1.BadGatewayException('Password tidak sama');
        }
        const checkEmail = await this.AuthService.checkEmail(dto.email);
        if (!checkEmail) {
            throw new common_1.BadRequestException('Email sudah digunakan , silahkan gunakan alamat email yang lain');
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const hash = await argon.hash(dto.password);
        delete dto.password;
        delete dto.confPassword;
        const newReceptionist = await this.prisma.pharmacy.create({
            data: {
                clinic_id: idClinic,
                password: hash,
                ...dto,
            },
        });
        return (0, response_1.NewData)(201, newReceptionist, 'berhasil menambahkan seorang farmasi', 'farmasi');
    }
    async changePasswordReceptionist(id, req, dto) {
        if (dto.newPassword !== dto.confPassword) {
            throw new common_1.BadRequestException('Password baru dan confirm password harus sama');
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const hash = await argon.hash(dto.newPassword);
        try {
            const user = await this.prisma.receptionist.update({
                where: {
                    clinic_id: idClinic,
                    id: id,
                    is_deleted: false,
                },
                data: {
                    password: hash,
                },
            });
            delete user.password;
            delete user.is_deleted;
            return (0, clinic_response_1.ClinicResponse)(200, user, `berhasil mengubah password dari ${user.name}`);
        }
        catch {
            throw new common_1.NotFoundException('data receptionist tidak ditemukan , mungkin receptionist sudah terhapus');
        }
    }
    async changePasswordDoctor(id, req, dto) {
        if (dto.newPassword !== dto.confPassword) {
            throw new common_1.BadRequestException('Password baru dan confirm password harus sama');
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const hash = await argon.hash(dto.newPassword);
        try {
            const user = await this.prisma.doctor.update({
                where: {
                    clinic_id: idClinic,
                    id: id,
                    is_deleted: false,
                },
                data: {
                    password: hash,
                },
            });
            delete user.password;
            delete user.is_deleted;
            return (0, clinic_response_1.ClinicResponse)(200, user, `berhasil mengubah password dari ${user.name}`);
        }
        catch {
            throw new common_1.NotFoundException('data dokter tidak ditemukan , mungkin dokter sudah terhapus');
        }
    }
    async changePasswordPharmacy(id, req, dto) {
        if (dto.newPassword !== dto.confPassword) {
            throw new common_1.BadRequestException('Password baru dan confirm password harus sama');
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const hash = await argon.hash(dto.newPassword);
        try {
            const user = await this.prisma.pharmacy.update({
                where: {
                    clinic_id: idClinic,
                    id: id,
                    is_deleted: false,
                },
                data: {
                    password: hash,
                },
            });
            delete user.password;
            delete user.is_deleted;
            return (0, clinic_response_1.ClinicResponse)(200, user, `berhasil mengubah password dari ${user.name}`);
        }
        catch {
            throw new common_1.NotFoundException('data seorang farmasi tidak ditemukan , mungkin seorang farmasi sudah terhapus');
        }
    }
    async changePasswordCashier(id, req, dto) {
        if (dto.newPassword !== dto.confPassword) {
            throw new common_1.BadRequestException('Password baru dan confirm password harus sama');
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const hash = await argon.hash(dto.newPassword);
        try {
            const user = await this.prisma.cashier.update({
                where: {
                    clinic_id: idClinic,
                    id: id,
                    is_deleted: false,
                },
                data: {
                    password: hash,
                },
            });
            delete user.password;
            delete user.is_deleted;
            return (0, clinic_response_1.ClinicResponse)(200, user, `berhasil mengubah password dari ${user.name}`);
        }
        catch {
            throw new common_1.NotFoundException('data seorang kasir tidak ditemukan , mungkin seorang kasir sudah terhapus');
        }
    }
    async deleteReceptionist(id, req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const deleted = await this.prisma.receptionist.update({
            where: {
                id: id,
                clinic_id: idClinic,
            },
            data: {
                is_deleted: true,
            },
        });
        if (!deleted) {
            throw new common_1.BadRequestException('akun tidak ditemukan ');
        }
        delete deleted.password;
        return (0, clinic_response_1.ClinicResponse)(200, deleted, `berhasil menghapus akun ${deleted.name}`);
    }
    async deleteDoctor(id, req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const deleted = await this.prisma.doctor.update({
            where: {
                id: id,
                clinic_id: idClinic,
            },
            data: {
                is_deleted: true,
            },
        });
        if (!deleted) {
            throw new common_1.BadRequestException('akun tidak ditemukan ');
        }
        delete deleted.password;
        return (0, clinic_response_1.ClinicResponse)(200, deleted, `berhasil menghapus akun ${deleted.name}`);
    }
    async deletePharmacy(id, req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const deleted = await this.prisma.pharmacy.update({
            where: {
                id: id,
                clinic_id: idClinic,
            },
            data: {
                is_deleted: true,
            },
        });
        if (!deleted) {
            throw new common_1.BadRequestException('akun tidak ditemukan ');
        }
        delete deleted.password;
        return (0, clinic_response_1.ClinicResponse)(200, deleted, `berhasil menghapus akun ${deleted.name}`);
    }
    async deleteCashier(id, req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        const deleted = await this.prisma.cashier.update({
            where: {
                id: id,
                clinic_id: idClinic,
            },
            data: {
                is_deleted: true,
            },
        });
        if (!deleted) {
            throw new common_1.BadRequestException('akun tidak ditemukan ');
        }
        delete deleted.password;
        return (0, clinic_response_1.ClinicResponse)(200, deleted, `berhasil menghapus akun ${deleted.name}`);
    }
    async editReceptionist(id, req, dto) {
        const findUser = await this.prisma.receptionist.findUnique({
            where: {
                id: id,
            },
        });
        if (dto.email) {
            const checkEmail = await this.AuthService.checkEmail(dto.email, findUser.email);
            if (!checkEmail) {
                throw new common_1.BadRequestException('Email sudah digunakan , silahkan gunakan alamat email yang lain');
            }
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        if (findUser.clinic_id !== idClinic) {
            throw new common_1.ForbiddenException('tidak bisa mengubah karyawan dari klinik lain');
        }
        const user = await this.prisma.receptionist.update({
            where: {
                id: id,
            },
            data: {
                ...dto,
            },
        });
        delete user.password;
        return (0, clinic_response_1.ClinicResponse)(200, user, `berhasil mengubah akun ${user.name}`);
    }
    async editDoctor(id, req, dto) {
        const findUser = await this.prisma.doctor.findUnique({
            where: {
                id: id,
            },
        });
        if (dto.email) {
            const checkEmail = await this.AuthService.checkEmail(dto.email, findUser.email);
            if (!checkEmail) {
                throw new common_1.BadRequestException('Email sudah digunakan , silahkan gunakan alamat email yang lain');
            }
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        if (findUser.clinic_id !== idClinic) {
            throw new common_1.ForbiddenException('tidak bisa mengubah karyawan dari klinik lain');
        }
        const user = await this.prisma.doctor.update({
            where: {
                id: id,
            },
            data: {
                ...dto,
            },
        });
        delete user.password;
        return (0, clinic_response_1.ClinicResponse)(200, user, `berhasil mengubah akun ${user.name}`);
    }
    async editPharmacy(id, req, dto) {
        const findUser = await this.prisma.pharmacy.findUnique({
            where: {
                id: id,
            },
        });
        if (dto.email) {
            const checkEmail = await this.AuthService.checkEmail(dto.email, findUser.email);
            if (!checkEmail) {
                throw new common_1.BadRequestException('Email sudah digunakan , silahkan gunakan alamat email yang lain');
            }
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        if (findUser.clinic_id !== idClinic) {
            throw new common_1.ForbiddenException('tidak bisa mengubah karyawan dari klinik lain');
        }
        const user = await this.prisma.pharmacy.update({
            where: {
                id: id,
            },
            data: {
                ...dto,
            },
        });
        delete user.password;
        return (0, clinic_response_1.ClinicResponse)(200, user, `berhasil mengubah akun ${user.name}`);
    }
    async editCashier(id, req, dto) {
        const findUser = await this.prisma.cashier.findUnique({
            where: {
                id: id,
            },
        });
        if (dto.email) {
            const checkEmail = await this.AuthService.checkEmail(dto.email, findUser.email);
            if (!checkEmail) {
                throw new common_1.BadRequestException('Email sudah digunakan , silahkan gunakan alamat email yang lain');
            }
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        if (findUser.clinic_id !== idClinic) {
            throw new common_1.ForbiddenException('tidak bisa mengubah karyawan dari klinik lain');
        }
        const user = await this.prisma.cashier.update({
            where: {
                id: id,
            },
            data: {
                ...dto,
            },
        });
        delete user.password;
        return (0, clinic_response_1.ClinicResponse)(200, user, `berhasil mengubah akun ${user.name}`);
    }
    async getReceptionistById(id, req) {
        const findUser = await this.prisma.receptionist.findUnique({
            where: {
                id: id,
            },
        });
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        if (!findUser) {
            throw new common_1.NotFoundException('karyawan tidak ditemukan');
        }
        if (findUser.clinic_id !== idClinic) {
            throw new common_1.ForbiddenException('tidak bisa melihat karyawan dari klinik lain');
        }
        delete findUser.password;
        delete findUser.is_deleted;
        return (0, clinic_response_1.ClinicResponse)(200, findUser, ` berhasil mengambil data ${findUser.name}`);
    }
    async getDoctorById(id, req) {
        const findUser = await this.prisma.doctor.findUnique({
            where: {
                id: id,
            },
        });
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        if (!findUser) {
            throw new common_1.NotFoundException('karyawan tidak ditemukan');
        }
        if (findUser.clinic_id !== idClinic) {
            throw new common_1.ForbiddenException('tidak bisa melihat karyawan dari klinik lain');
        }
        delete findUser.password;
        delete findUser.is_deleted;
        return (0, clinic_response_1.ClinicResponse)(200, findUser, ` berhasil mengambil data ${findUser.name}`);
    }
    async getPharmacyById(id, req) {
        const findUser = await this.prisma.pharmacy.findUnique({
            where: {
                id: id,
            },
        });
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        if (!findUser) {
            throw new common_1.NotFoundException('karyawan tidak ditemukan');
        }
        if (findUser.clinic_id !== idClinic) {
            throw new common_1.ForbiddenException('tidak bisa melihat karyawan dari klinik lain');
        }
        delete findUser.password;
        delete findUser.is_deleted;
        return (0, clinic_response_1.ClinicResponse)(200, findUser, ` berhasil mengambil data ${findUser.name}`);
    }
    async getCashierById(id, req) {
        const findUser = await this.prisma.cashier.findUnique({
            where: {
                id: id,
            },
        });
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = payload.sub;
        if (!findUser) {
            throw new common_1.NotFoundException('karyawan tidak ditemukan');
        }
        if (findUser.clinic_id !== idClinic) {
            throw new common_1.ForbiddenException('tidak bisa melihat karyawan dari klinik lain');
        }
        delete findUser.password;
        delete findUser.is_deleted;
        return (0, clinic_response_1.ClinicResponse)(200, findUser, ` berhasil mengambil data ${findUser.name}`);
    }
    async getAllMasterService(req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = parseInt(payload.sub);
        const masterservice = await this.prisma.master_Service.findMany({
            where: {
                clinic_id: idClinic,
                is_deleted: false,
            },
            orderBy: {
                type: 'asc',
            },
        });
        if (masterservice.length < 0) {
            throw new common_1.NotFoundException('tidak ada data layanan , segera tambahkan');
        }
        return (0, clinic_response_1.ClinicResponse)(201, masterservice, `mendapatkan`);
    }
    async getAllMasterServiceById(id, req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = parseInt(payload.sub);
        const masterservice = await this.prisma.master_Service.findUnique({
            where: {
                id,
            },
        });
        const service = await this.prisma.service.count({
            where: {
                master_service_id: id,
            },
        });
        const count = masterservice.price * service;
        if (!masterservice) {
            throw new common_1.NotFoundException('tidak ada data layanan , segera tambahkan');
        }
        const response = {
            name: masterservice.name,
            type: masterservice.type,
            price: masterservice.price,
            count,
        };
        return (0, clinic_response_1.ClinicResponse)(201, response, `mendapatkan master service`);
    }
    async createMasterService(req, dto) {
        if (dto.type !== 'registration' &&
            dto.type !== 'service' &&
            dto.type !== 'medicine') {
            throw new common_1.ForbiddenException('type dari service harus diantara registration , service atau medicine');
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = parseInt(payload.sub);
        const findRegister = await this.prisma.master_Service.findMany({
            where: {
                clinic_id: idClinic,
                is_deleted: false,
                type: 'registration',
            },
        });
        if (findRegister.length >= 1 && dto.type === 'registration') {
            throw new common_1.ForbiddenException('biaya registrasi tiap klinik hanya boleh mempunyai satu harga');
        }
        else {
            const MasterService = await this.prisma.master_Service.create({
                data: {
                    clinic_id: idClinic,
                    ...dto,
                },
            });
            return (0, clinic_response_1.ClinicResponse)(201, MasterService, `berhasil menambahkan ${MasterService.name}`);
        }
    }
    async editMasterService(id, req, dto) {
        if (dto.type) {
            if (dto.type !== 'registration' &&
                dto.type !== 'service' &&
                dto.type !== 'medicine') {
                throw new common_1.ForbiddenException('type dari service harus diantara registration , service atau medicine');
            }
        }
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = parseInt(payload.sub);
        const findRegister = await this.prisma.master_Service.findFirst({
            where: {
                clinic_id: idClinic,
                is_deleted: false,
                type: 'registration',
            },
        });
        if (findRegister && dto.type === 'registration' && findRegister.id !== id) {
            throw new common_1.ForbiddenException('biaya registrasi tiap klinik hanya boleh mempunyai satu harga');
        }
        else {
            try {
                const MasterService = await this.prisma.master_Service.update({
                    where: {
                        clinic_id: idClinic,
                        id: id,
                        is_deleted: false,
                    },
                    data: {
                        ...dto,
                    },
                });
                return (0, clinic_response_1.ClinicResponse)(201, MasterService, `berhasil mengedit ${MasterService.name}`);
            }
            catch (err) {
                throw new common_1.NotFoundException('master service tidak ditemukan');
            }
        }
    }
    async deleteMasterService(id, req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = parseInt(payload.sub);
        try {
            const deletedMasterService = await this.prisma.master_Service.update({
                where: {
                    id: id,
                    clinic_id: idClinic,
                    NOT: {
                        type: 'registration',
                    },
                },
                data: {
                    is_deleted: true,
                },
            });
            delete deletedMasterService.is_deleted;
            return (0, clinic_response_1.ClinicResponse)(200, deletedMasterService, `berhasil mengahapus ${deletedMasterService.name}`);
        }
        catch {
            throw new common_1.BadRequestException('biaya pendaftaran hanya bisa diubah , jika diklinik tidak ada biaya pendaftaran uabh saja harga menjadi 0');
        }
    }
    async getTransaction(page, req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = parseInt(payload.sub);
        const ipage = 20 * page - 20;
        const transaction = await this.prisma.medical_History.findMany({
            take: 20,
            skip: ipage,
            where: {
                clinic_id: idClinic,
                is_deleted: false,
                status: 'done',
            },
            orderBy: {
                updated_at: 'asc',
            },
        });
        if (transaction.length < 1) {
            throw new common_1.NotFoundException('tidak ada transaksi');
        }
        return (0, clinic_response_1.ClinicResponse)(200, transaction, ' berhasil mengambil data transaksi');
    }
    async getTransactionById(id, req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const idClinic = parseInt(payload.sub);
        const transaction = await this.prisma.medical_History.findUnique({
            where: {
                id: id,
                clinic_id: idClinic,
                is_deleted: false,
            },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('data transaksi tidak ditemukan');
        }
        const patient = await this.prisma.patient.findUnique({
            where: {
                id: transaction.patient_id,
            },
        });
        if (!patient) {
            throw new common_1.BadRequestException('transaksi belum selesai');
        }
        const doctor = await this.prisma.doctor.findUnique({
            where: {
                id: transaction.doctor_id,
            },
        });
        delete doctor.password;
        delete doctor.is_deleted;
        if (!doctor) {
            throw new common_1.BadRequestException('transaksi belum selesai');
        }
        const receptionist = await this.prisma.receptionist.findUnique({
            where: {
                id: transaction.receptionist_id,
            },
        });
        delete receptionist.password;
        delete receptionist.is_deleted;
        if (!receptionist) {
            throw new common_1.BadRequestException('transaksi belum selesai');
        }
        const pharmacy = await this.prisma.pharmacy.findUnique({
            where: {
                id: transaction.pharmacy_id,
            },
        });
        delete pharmacy.password;
        delete pharmacy.is_deleted;
        if (!pharmacy) {
            throw new common_1.BadRequestException('transaksi belum selesai');
        }
        const cashier = await this.prisma.cashier.findUnique({
            where: {
                id: transaction.cashier_id,
            },
        });
        delete cashier.password;
        delete cashier.is_deleted;
        if (!cashier) {
            throw new common_1.BadRequestException('transaksi belum selesai');
        }
        const service = await this.prisma.service.findMany({
            where: {
                medical_history_id: id,
                is_deleted: false,
            },
        });
        if (!service) {
            throw new common_1.BadRequestException('transaksi belum selesai');
        }
        let paraService = [];
        await Promise.all(service.map(async (e) => {
            for (e of service) {
                const masterservice = await this.prisma.master_Service.findUnique({
                    where: {
                        id: e.master_service_id,
                    },
                });
                delete masterservice.is_deleted;
                delete masterservice.created_at;
                delete masterservice.updated_at;
                delete masterservice.clinic_id;
                paraService.push(masterservice);
            }
        }));
        return (0, clinic_response_1.getTransactionById)(200, transaction, patient, receptionist, doctor, pharmacy, cashier, paraService, 'berhasil mendapatkan informasi transaksi');
    }
};
exports.ClinicService = ClinicService;
exports.ClinicService = ClinicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        auth_service_1.AuthService])
], ClinicService);
//# sourceMappingURL=clinic.service.js.map