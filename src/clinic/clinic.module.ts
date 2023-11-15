import { Module } from '@nestjs/common';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';
import { JwtStrategy } from 'src/auth/strategy';
import { RtStrategy } from 'src/auth/strategy/rt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ClinicController],
  providers: [ClinicService , JwtStrategy , RtStrategy , AuthService]
})
export class ClinicModule {}
