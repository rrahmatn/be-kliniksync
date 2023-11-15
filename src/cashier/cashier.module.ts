import { Module } from '@nestjs/common';
import { CashierController } from './cashier.controller';
import { CashierService } from './cashier.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [CashierController],
  providers: [CashierService , JwtService , AuthService]
})
export class CashierModule {}
