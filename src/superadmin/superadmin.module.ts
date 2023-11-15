import { Module } from '@nestjs/common';
import { SuperAdminController } from './superadmin.controller';
import { SuperAdminService} from './superadmin.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';
import { RtStrategy } from 'src/auth/strategy/rt.strategy';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SuperAdminController],
  providers: [SuperAdminService ,  JwtStrategy , RtStrategy , AuthService]
})
export class SuperadminModule {}
