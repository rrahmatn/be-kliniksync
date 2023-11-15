import { Module } from '@nestjs/common';
import { ReceptionistController } from './receptionist.controller';
import { ReceptionistService } from './receptionist.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [ReceptionistController],
  providers: [ReceptionistService , JwtService , AuthService]
})
export class ReceptionistModule {}
