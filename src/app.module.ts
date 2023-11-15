import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ServiceController } from './service/service.controller';
import { ClinicModule } from './clinic/clinic.module';
import { SuperadminModule } from './superadmin/superadmin.module';
import { ReceptionistModule } from './receptionist/receptionist.module';
import { DoctorModule } from './doctor/doctor.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { CashierModule } from './cashier/cashier.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    ClinicModule,
    SuperadminModule,
    ReceptionistModule,
    DoctorModule,
    PharmacyModule,
    CashierModule,
  ],
  controllers: [ServiceController],
})



export class AppModule {}
