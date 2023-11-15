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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async checkEmail(checkEmail, uncheck) {
        if (!checkEmail) {
            throw new common_1.ForbiddenException('email harus diisi');
        }
        const superAdminEmail = await this.prisma.superAdmin.findFirst({
            where: {
                email: {
                    equals: checkEmail,
                    not: {
                        equals: uncheck,
                    },
                },
            },
        });
        if (superAdminEmail) {
            return false;
        }
        else {
            const findEmailClinic = await this.prisma.clinic.findFirst({
                where: {
                    email: {
                        equals: checkEmail,
                        not: {
                            equals: uncheck,
                        },
                    },
                },
            });
            if (findEmailClinic) {
                return false;
            }
            else {
                const findEmailDoctor = await this.prisma.doctor.findFirst({
                    where: {
                        email: {
                            equals: checkEmail,
                            not: {
                                equals: uncheck,
                            },
                        },
                    },
                });
                if (findEmailDoctor) {
                    return false;
                }
                else {
                    const findEmailReceptionist = await this.prisma.receptionist.findFirst({
                        where: {
                            email: {
                                equals: checkEmail,
                                not: {
                                    equals: uncheck,
                                },
                            },
                        },
                    });
                    if (findEmailReceptionist) {
                        return false;
                    }
                    else {
                        const finEmailCashier = await this.prisma.cashier.findFirst({
                            where: {
                                email: {
                                    equals: checkEmail,
                                    not: {
                                        equals: uncheck,
                                    },
                                },
                            },
                        });
                        if (findEmailClinic) {
                            return false;
                        }
                        else {
                            const finEmailPharmacy = await this.prisma.pharmacy.findFirst({
                                where: {
                                    email: {
                                        equals: checkEmail,
                                        not: {
                                            equals: uncheck,
                                        },
                                    },
                                },
                            });
                            if (finEmailPharmacy) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }
    async signin(dto) {
        let role;
        const user = await this.prisma.clinic.findUnique({
            where: {
                is_deleted: false,
                email: dto.email,
            },
        });
        if (user) {
            const currentDate = new Date();
            if (user.expired_at < currentDate) {
                throw new common_1.ForbiddenException({
                    status: 403,
                    message: 'Token klinik anda sudah kadaluarsa , silahkan hubungi pihak kami untuk memperpanjang atau membuat kontrak baru',
                });
            }
            const pwMatches = await argon.verify(user.password, dto.password);
            if (!pwMatches) {
                throw new common_1.BadRequestException('password salah');
            }
            role = 'admin';
            return this.signToken(user.id, user.name, user.email, role);
        }
        else {
            const user = await this.prisma.receptionist.findUnique({
                where: {
                    is_deleted: false,
                    email: dto.email,
                },
            });
            if (user) {
                const clinic = await this.prisma.clinic.findUnique({
                    where: {
                        is_deleted: false,
                        id: user.clinic_id,
                    },
                });
                const currentDate = new Date();
                if (clinic.expired_at < currentDate) {
                    throw new common_1.ForbiddenException({
                        status: 403,
                        message: 'Token klinik anda sudah kadaluarsa , silahkan hubungi pihak kami untuk memperpanjang atau membuat kontrak baru',
                    });
                }
                const pwMatches = await argon.verify(user.password, dto.password);
                if (!pwMatches) {
                    throw new common_1.BadRequestException('password salah');
                }
                role = 'receptionist';
                return this.signToken(user.id, user.name, user.email, role);
            }
            else {
                const user = await this.prisma.doctor.findUnique({
                    where: {
                        is_deleted: false,
                        email: dto.email,
                    },
                });
                if (user) {
                    const clinic = await this.prisma.clinic.findUnique({
                        where: {
                            is_deleted: false,
                            id: user.clinic_id,
                        },
                    });
                    const currentDate = new Date();
                    if (clinic.expired_at < currentDate) {
                        throw new common_1.ForbiddenException({
                            status: 403,
                            message: 'Token klinik anda sudah kadaluarsa , silahkan hubungi pihak kami untuk memperpanjang atau membuat kontrak baru',
                        });
                    }
                    const pwMatches = await argon.verify(user.password, dto.password);
                    if (!pwMatches) {
                        throw new common_1.BadRequestException('password salah');
                    }
                    role = 'doctor';
                    await this.prisma.doctor.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            is_active: true,
                        },
                    });
                    return this.signToken(user.id, user.name, user.email, role);
                }
                else {
                    const user = await this.prisma.pharmacy.findUnique({
                        where: {
                            is_deleted: false,
                            email: dto.email,
                        },
                    });
                    if (user) {
                        const clinic = await this.prisma.clinic.findUnique({
                            where: {
                                is_deleted: false,
                                id: user.clinic_id,
                            },
                        });
                        const currentDate = new Date();
                        if (clinic.expired_at < currentDate) {
                            throw new common_1.ForbiddenException({
                                status: 403,
                                message: 'Token klinik anda sudah kadaluarsa , silahkan hubungi pihak kami untuk memperpanjang atau membuat kontrak baru',
                            });
                        }
                        const pwMatches = await argon.verify(user.password, dto.password);
                        if (!pwMatches) {
                            throw new common_1.BadRequestException('password salah');
                        }
                        role = 'pharmacy';
                        return this.signToken(user.id, user.name, user.email, role);
                    }
                    else {
                        const user = await this.prisma.cashier.findUnique({
                            where: {
                                is_deleted: false,
                                email: dto.email,
                            },
                        });
                        if (user) {
                            const clinic = await this.prisma.clinic.findUnique({
                                where: {
                                    is_deleted: false,
                                    id: user.clinic_id,
                                },
                            });
                            const currentDate = new Date();
                            if (clinic.expired_at < currentDate) {
                                throw new common_1.ForbiddenException({
                                    status: 403,
                                    message: 'Token klinik anda sudah kadaluarsa , silahkan hubungi pihak kami untuk memperpanjang atau membuat kontrak baru',
                                });
                            }
                            const pwMatches = await argon.verify(user.password, dto.password);
                            if (!pwMatches) {
                                throw new common_1.BadRequestException('password salah');
                            }
                            role = 'cashier';
                            return this.signToken(user.id, user.name, user.email, role);
                        }
                        else {
                            const superAdmin = await this.prisma.superAdmin.findUnique({
                                where: {
                                    email: dto.email,
                                },
                            });
                            if (superAdmin) {
                                if (!superAdmin)
                                    throw new common_1.ForbiddenException('Credentials incorrect');
                                role = 'superadmin';
                                if (superAdmin.is_deleted === true) {
                                    throw new common_1.NotFoundException('Akun tidak ditemukan');
                                }
                                const pwMatches = await argon.verify(superAdmin.password, dto.password);
                                if (!pwMatches) {
                                    throw new common_1.BadRequestException('password salah');
                                }
                                return this.signToken(superAdmin.id, superAdmin.name, superAdmin.email, role);
                            }
                            else {
                                throw new common_1.NotFoundException('tidak ada akun untuk email ini');
                            }
                        }
                    }
                }
            }
        }
    }
    async signToken(userId, name, email, role) {
        const payload = {
            name,
            sub: userId,
            email,
            role,
        };
        const atsecret = this.config.get('JWT_SECRET');
        const rtsecret = this.config.get('REFRESH_TOKEN');
        const [at, rt] = await Promise.all([
            this.jwt.signAsync(payload, {
                secret: atsecret,
                expiresIn: '12h',
            }),
            this.jwt.signAsync(payload, {
                secret: rtsecret,
                expiresIn: '30d',
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async newToken(userId, name, email, role) {
        const payload = {
            sub: userId,
            name,
            email,
            role,
        };
        const atsecret = this.config.get('JWT_SECRET');
        const at = await this.jwt.signAsync(payload, {
            secret: atsecret,
            expiresIn: '15m',
        });
        return {
            access_token: at,
        };
    }
    async refreshToken(refreshToken) {
        const userData = await this.verifyRefreshToken(refreshToken);
        return this.newToken(userData.userId, userData.name, userData.email, userData.role);
    }
    async verifyRefreshToken(token) {
        const rtsecret = await this.config.get('REFRESH_TOKEN');
        try {
            const payload = await this.jwt.verify(token, {
                secret: rtsecret,
            });
            return {
                userId: payload.sub,
                name: payload.name,
                email: payload.email,
                role: payload.role,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Refresh token tidak valid');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map