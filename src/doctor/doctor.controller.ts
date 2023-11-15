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
import { DoctorService } from './doctor.service';
import { DoctorGuard, JwtGuard } from 'src/auth/guard';
import { ChangePassword, EditUser } from 'src/global-dto';
import { AddService, EditMedicalHistory } from './dto';

@Controller('doctor')
@ApiTags('doctor')
@ApiBearerAuth()
export class DoctorController {
  constructor(private DoctorService: DoctorService) {}

  @UseGuards(JwtGuard, DoctorGuard)
  @Get()
  async getDoctor(@Request() req: any) {
    return this.DoctorService.getUser(req);
  }

  @UseGuards(JwtGuard, DoctorGuard)
  @Patch()
  async editDoctor(@Request() req: any, @Body() dto: EditUser) {
    return this.DoctorService.editDoctor(req, dto);
  }

  @UseGuards(JwtGuard, DoctorGuard)
  @Patch('changepassword')
  async changePassword(@Request() req: any, @Body() dto: ChangePassword) {
    return this.DoctorService.changePassword(req, dto);
  }

  @UseGuards(JwtGuard, DoctorGuard)
  @Get('queue')
  async getQueue(@Request() req: any) {
    return this.DoctorService.getQueue(req);
  }

  @UseGuards(JwtGuard, DoctorGuard)
  @Get('service')
  async getService(@Request() req: any) {
    return this.DoctorService.getService(req);
  }
  @UseGuards(JwtGuard, DoctorGuard)
  @Post('service')
  async addService(@Body() dto: AddService) {
    return this.DoctorService.addService(dto);
  }

  @UseGuards(JwtGuard, DoctorGuard)
  @Patch('medicalhistory/:id')
  async editMedicalHistory(
    @Param('id') id: string,
    @Body() dto: EditMedicalHistory,
  ) {
    return this.DoctorService.editMedicalHistory(parseInt(id), dto);
  }

  @UseGuards(JwtGuard, DoctorGuard)
  @Get('patient/:id')
  async getPatient(@Param('id') id: string) {
    return this.DoctorService.getPatient(parseInt(id));
  }

  @UseGuards(JwtGuard, DoctorGuard)
  @Get('medicalhistory/:id')
  async getMedicalHistoryById(@Param('id') id : string){
    return this.DoctorService.getMedicalHistoryById(parseInt(id))
  }
}
