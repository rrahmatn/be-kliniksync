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
exports.ReceptionistService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const response_1 = require("../response");
const argon = require("argon2");
let ReceptionistService = class ReceptionistService {
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
        const user = await this.prisma.receptionist.findUnique({
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
    async editUser(req, dto) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const iuser = await this.prisma.receptionist.findUnique({
            where: {
                id: payload.sub,
            },
        });
        const id = payload.sub;
        const matches = await argon.verify(iuser.password, dto.password);
        if (!matches) {
            throw new common_1.BadRequestException('password salah');
        }
        delete dto.password;
        const user = await this.prisma.receptionist.update({
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
        const iuser = await this.prisma.receptionist.findUnique({
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
        const user = await this.prisma.receptionist.update({
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
    async addPatient(dto) {
        const phone = await this.prisma.patient.findFirst({
            where: {
                phone: dto.phone,
            },
        });
        if (phone !== null) {
            throw new common_1.BadRequestException(`nomor telepon sudah terdaftar atas nama ${phone.name}`);
        }
        if (dto.gender !== 'laki-laki' && dto.gender !== 'perempuan') {
            throw new common_1.BadRequestException('gender harus diantara laki-laki atau perempuan');
        }
        const birth_date = new Date(dto.birth_date);
        delete dto.birth_date;
        const patient = await this.prisma.patient.create({
            data: {
                birth_date,
                ...dto,
            },
        });
        if (!patient) {
            throw new common_1.NotAcceptableException('gagal menambahkan pasien baru');
        }
        return (0, response_1.ReceptionistResponse)(204, patient, 'berhasil menambahkam satu patient');
    }
    async editPatient(id, dto) {
        if (dto.gender) {
            if (dto.gender !== 'laki-laki' && dto.gender !== 'perempuan') {
                throw new common_1.BadRequestException('gender harus diantara laki-laki atau perempuan');
            }
        }
        let birth_date;
        if (!dto.birth_date) {
            delete dto.birth_date;
        }
        else {
            birth_date = new Date(dto.birth_date);
        }
        delete dto.birth_date;
        if (dto.phone) {
            const user = await this.prisma.patient.findUnique({
                where: {
                    id,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException('data pasien tidak ditemukan');
            }
            const phone = await this.prisma.patient.findFirst({
                where: {
                    phone: {
                        equals: dto.phone,
                        not: {
                            equals: user.phone,
                        },
                    },
                },
            });
            if (phone !== null) {
                throw new common_1.BadRequestException(`nomor telepon sudah terdaftar atas nama ${phone.name}`);
            }
        }
        const patient = await this.prisma.patient.update({
            where: {
                id,
            },
            data: {
                birth_date: birth_date,
                ...dto,
            },
        });
        return patient;
    }
    async getDoctor(req) {
        const user = await this.getUser(req);
        const clinic_id = user.clinic_id;
        const doctor = await this.prisma.doctor.findMany({
            where: {
                clinic_id,
                is_deleted: false,
                is_active: true,
            },
        });
        const doctorResponse = [];
        await Promise.all(doctor.map(async (e) => {
            const queue = await this.prisma.medical_History.count({
                where: {
                    doctor_id: e.id,
                    status: 'on_doctor',
                },
            });
            delete e.password;
            delete e.is_deleted;
            doctorResponse.push({
                id: e.id,
                name: e.name,
                specialist: e.specialist,
                queue: queue,
            });
        }));
        return (0, response_1.ReceptionistResponse)(200, doctorResponse, 'berhasil mendapatkan semua dokter pada klinik');
    }
    async addQueue(req, dto) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const id = payload.sub;
        const user = await this.prisma.receptionist.findUnique({
            where: {
                id,
            },
        });
        const clinic = await this.prisma.clinic.findUnique({
            where: {
                id: user.clinic_id,
            },
        });
        const cekQueue = await this.prisma.medical_History.findFirst({
            where: {
                patient_id: dto.id_patient,
                NOT: {
                    status: 'done',
                },
            },
        });
        if (cekQueue) {
            throw new common_1.ForbiddenException('pasien masih ada transaksi yang belum lunas atau pengobatan yang masih berjalan');
        }
        const payment = clinic.type === 'premium' ? true : false;
        const newQueue = await this.prisma.medical_History.create({
            data: {
                patient_id: dto.id_patient,
                doctor_id: dto.id_doctor,
                clinic_id: clinic.id,
                receptionist_id: user.id,
                status: 'on_doctor',
                payment_status: payment,
            },
        });
        const registration = await this.prisma.master_Service.findFirst({
            where: {
                type: 'registration',
            },
        });
        if (!registration) {
            throw new common_1.BadRequestException('tolong minta kepada admin untuk memberikan harga untuk registrasi');
        }
        const paymentRegistration = await this.prisma.service.create({
            data: {
                master_service_id: registration.id,
                medical_history_id: newQueue.id,
            },
        });
        if (!newQueue) {
            throw new common_1.BadRequestException('gagal menambahkan pasien ke antrian');
        }
        delete newQueue.is_deleted;
        return (0, response_1.ReceptionistResponse)(200, newQueue, `berhsail menambahkan pasien kedalam antrian`);
    }
    async searchPatient(phone) {
        if (phone.length < 8) {
            throw new common_1.BadRequestException('minimal masukan 8 angkar untuk pencarian berdasarnkan nomor telepon');
        }
        const patient = await this.prisma.patient.findMany({
            where: {
                phone: {
                    contains: phone,
                },
            },
        });
        if (patient.length < 1) {
            throw new common_1.NotFoundException('data pasien tidak ditemukan , silahkan tambah data pasien');
        }
        return (0, response_1.ReceptionistResponse)(200, patient, `berhasil mendaptkan data pasien`);
    }
    async searchPatientByNik(nik) {
        if (nik.length < 8) {
            throw new common_1.BadRequestException('minimal masukan 8 angkar untuk pencarian berdasarnkan nik');
        }
        const patient = await this.prisma.patient.findMany({
            where: {
                nik: {
                    contains: nik,
                },
            },
        });
        if (patient.length < 1) {
            throw new common_1.NotFoundException('data pasien tidak ditemukan , silahkan tambah data pasien');
        }
        return (0, response_1.ReceptionistResponse)(200, patient, `berhasil mendaptkan data pasien`);
    }
    async getPatient(id) {
        const patient = await this.prisma.patient.findUnique({
            where: {
                id,
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException('data pasien tidak ditemukan');
        }
        const currentDate = new Date();
        const ageInMilliseconds = currentDate.getTime() - patient.birth_date.getTime();
        const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
        const response = {
            name: patient.name,
            address: patient.address,
            phone: patient.phone,
            age: ageInYears,
        };
        delete patient.birth_date;
        return (0, response_1.ReceptionistResponse)(200, response, `berhasil mendapatkan data ${patient.name}`);
    }
    async getAllQueue(req) {
        const token = req.headers.authorization?.split(' ') ?? [];
        const accessToken = token[1];
        const payload = await this.jwtService.verifyAsync(accessToken, {
            secret: this.config.get('JWT_SECRET'),
        });
        const id = payload.sub;
        const user = await this.prisma.receptionist.findUnique({
            where: {
                id,
            },
        });
        const queue = await this.prisma.medical_History.count({
            where: {
                clinic_id: user.clinic_id,
                status: 'on_doctor'
            }
        });
        return (0, response_1.ReceptionistResponse)(200, queue, 'berhasil mendapatkan antrian');
    }
};
exports.ReceptionistService = ReceptionistService;
exports.ReceptionistService = ReceptionistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], ReceptionistService);
//# sourceMappingURL=receptionist.service.js.map