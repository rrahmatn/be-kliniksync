import { PrismaService } from 'src/prisma/prisma.service';
import { Signin } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NewToken, Token } from './types';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    checkEmail(checkEmail: string, uncheck?: string): Promise<boolean>;
    signin(dto: Signin): Promise<Token>;
    signToken(userId: number, name: string, email: string, role: string): Promise<Token>;
    newToken(userId: number, name: string, email: string, role: string): Promise<NewToken>;
    refreshToken(refreshToken: string): Promise<NewToken>;
    verifyRefreshToken(token: string): Promise<{
        userId: number;
        name: string;
        email: string;
        role: string;
    }>;
}
