import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,

} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CashierGuard, JwtGuard } from 'src/auth/guard';
import { ChangePassword, EditUser } from 'src/global-dto';
import { CashierService } from './cashier.service';

@Controller('cashier')
@ApiTags('cashier')
@ApiBearerAuth()
export class CashierController {
  constructor(private CashierService: CashierService) {}

  @UseGuards(JwtGuard, CashierGuard)
  @Get()
  async getDoctor(@Request() req: any) {
    return this.CashierService.getUser(req);
  }

  @UseGuards(JwtGuard, CashierGuard)
  @Patch()
  async editDoctor(@Request() req: any, @Body() dto: EditUser) {
    return this.CashierService.editCashier(req, dto);
  }

  @UseGuards(JwtGuard, CashierGuard)
  @Patch('changepassword')
  async changePassword(@Request() req: any, @Body() dto: ChangePassword) {
    return this.CashierService.changePassword(req, dto);
  }

  @UseGuards(JwtGuard, CashierGuard)
  @Get('queue')
  async getQueue(@Request() req: any) {
    return this.CashierService.getQueue(req);
  }

  @UseGuards(JwtGuard, CashierGuard)
  @Get('medicalhistory/:id')
  async getMedicalHistory(@Param('id') id: string, @Request() req: any) {
    return this.CashierService.getMedicalHistory(parseInt(id), req);
  }
  @UseGuards(JwtGuard, CashierGuard)
  @Patch('medicalhistory/:id')
  async getDone(@Param('id') id: string, @Request() req: any) {
    return this.CashierService.getDone(parseInt(id), req);
  }
}
