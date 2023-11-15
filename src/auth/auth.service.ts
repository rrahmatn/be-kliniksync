import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SuperAdminDto, Signin } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NewToken, Token } from './types';
import { SuperAdminResponse } from 'src/response';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async checkEmail(checkEmail: string, uncheck?: string) {
    if (!checkEmail) {
      throw new ForbiddenException('email harus diisi');
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
    } else {
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
      } else {
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
        } else {
          const findEmailReceptionist =
            await this.prisma.receptionist.findFirst({
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
          } else {
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
            } else {
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
              } else {
                return true;
              }
            }
          }
        }
      }
    }
  }

  

  async signin(dto: Signin) {
    let role: string;

    const user = await this.prisma.clinic.findUnique({
      where: {
        is_deleted: false,
        email: dto.email,
      },
    });

    if (user) {
      const currentDate = new Date();
      if (user.expired_at < currentDate) {
        throw new ForbiddenException({
          status: 403,
          message:
            'Token klinik anda sudah kadaluarsa , silahkan hubungi pihak kami untuk memperpanjang atau membuat kontrak baru',
        });
      }
      const pwMatches = await argon.verify(user.password, dto.password);

      if (!pwMatches) {
        throw new BadRequestException('password salah');
      }

      role = 'admin';

      return this.signToken(user.id, user.name, user.email, role);
    } else {
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
          throw new ForbiddenException({
            status: 403,
            message:
              'Token klinik anda sudah kadaluarsa , silahkan hubungi pihak kami untuk memperpanjang atau membuat kontrak baru',
          });
        }
        const pwMatches = await argon.verify(user.password, dto.password);

        if (!pwMatches) {
          throw new BadRequestException('password salah');
        }

        role = 'receptionist';

        return this.signToken(user.id, user.name, user.email, role);
      } else {
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
            throw new ForbiddenException({
              status: 403,
              message:
                'Token klinik anda sudah kadaluarsa , silahkan hubungi pihak kami untuk memperpanjang atau membuat kontrak baru',
            });
          }
          const pwMatches = await argon.verify(user.password, dto.password);

          if (!pwMatches) {
            throw new BadRequestException('password salah');
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
        } else {
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
              throw new ForbiddenException({
                status: 403,
                message:
                  'Token klinik anda sudah kadaluarsa , silahkan hubungi pihak kami untuk memperpanjang atau membuat kontrak baru',
              });
            }
            const pwMatches = await argon.verify(user.password, dto.password);

            if (!pwMatches) {
              throw new BadRequestException('password salah');
            }
            role = 'pharmacy';

            return this.signToken(user.id, user.name, user.email, role);
          } else {
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
                throw new ForbiddenException({
                  status: 403,
                  message:
                    'Token klinik anda sudah kadaluarsa , silahkan hubungi pihak kami untuk memperpanjang atau membuat kontrak baru',
                });
              }
              const pwMatches = await argon.verify(user.password, dto.password);

              if (!pwMatches) {
                throw new BadRequestException('password salah');
              }

              role = 'cashier';

              return this.signToken(user.id, user.name, user.email, role);
            } else {
              const superAdmin = await this.prisma.superAdmin.findUnique({
                where: {
                  email: dto.email,
                },
              });
              if (superAdmin) {
                if (!superAdmin)
                  throw new ForbiddenException('Credentials incorrect');
                role = 'superadmin';
                if (superAdmin.is_deleted === true) {
                  throw new NotFoundException('Akun tidak ditemukan');
                }
                const pwMatches = await argon.verify(
                  superAdmin.password,
                  dto.password,
                );
                if (!pwMatches) {
                  throw new BadRequestException('password salah');
                }
                return this.signToken(
                  superAdmin.id,
                  superAdmin.name,
                  superAdmin.email,
                  role,
                );
              } else {
                throw new NotFoundException('tidak ada akun untuk email ini');
              }
            }
          }
        }
      }
    }
  }

  async signToken(
    userId: number,
    name: string,
    email: string,
    role: string,
  ): Promise<Token> {
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

  async newToken(
    userId: number,
    name: string,
    email: string,
    role: string,
  ): Promise<NewToken> {
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

  async refreshToken(refreshToken: string): Promise<NewToken> {
    // Di sini, Anda perlu memeriksa validitas refresh token dan mendapatkan data pengguna terkait.
    // Jika valid, Anda dapat menghasilkan access token yang baru.
    const userData = await this.verifyRefreshToken(refreshToken);
    // console.log(userData)
    return this.newToken(
      userData.userId,
      userData.name,
      userData.email,
      userData.role,
    );
  }

  async verifyRefreshToken(
    token: string,
  ): Promise<{ userId: number; name: string; email: string; role: string }> {
    const rtsecret = await this.config.get('REFRESH_TOKEN');

    try {
      const payload = await this.jwt.verify(token, {
        secret: rtsecret,
      });
      // console.log(payload)
      return {
        userId: payload.sub,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      };
    } catch (error) {
      throw new ForbiddenException('Refresh token tidak valid');
    }
  }
}
