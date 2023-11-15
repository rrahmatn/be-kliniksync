import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
declare const RtStrategy_base: new (...args: any[]) => Strategy;
export declare class RtStrategy extends RtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(req: Request, payload: {
        sub: number;
        email: string;
        role: string;
    }): Promise<{
        sub: number;
        email: string;
        role: string;
    }>;
}
export {};
