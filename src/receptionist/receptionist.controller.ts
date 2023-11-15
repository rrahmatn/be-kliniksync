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
import { ReceptionistService } from './receptionist.service';
import { ReceptionistGuard } from 'src/auth/guard/receptionist.guard';
import { JwtGuard } from 'src/auth/guard';
import { ChangePassword, EditUser } from 'src/global-dto';
import { AddPatient, AddQueue, EditPatient } from './dto/receptionist.dto';

@Controller('receptionist')
@ApiTags('receptionist')
@ApiBearerAuth()
export class ReceptionistController {
  constructor(private ReceptionistService: ReceptionistService) {}

  @UseGuards(JwtGuard, ReceptionistGuard)
  @Get('')
  async getUser(@Request() req: any) {
    return this.ReceptionistService.getUser(req);
  }

  @UseGuards(JwtGuard, ReceptionistGuard)
  @Patch('')
  async editUser(@Request() req: any, @Body() dto: EditUser) {
    return this.ReceptionistService.editUser(req, dto);
  }
  
  @UseGuards(JwtGuard, ReceptionistGuard)
  @Patch('changepassword')
  async ChangePassword(@Request() req: any , @Body() dto : ChangePassword) {
    return this.ReceptionistService.changePassword(req , dto);
  }

  @UseGuards(JwtGuard, ReceptionistGuard)
  @Post('patient')
  async addPatient(@Body() dto: AddPatient) {
    return this.ReceptionistService.addPatient(dto);
  }

  @UseGuards(JwtGuard, ReceptionistGuard)
  @Patch('patient/:id')
  async editPatient(@Param('id') id: string, @Body() dto: EditPatient) {
    return this.ReceptionistService.editPatient(parseInt(id), dto);
  }

  @UseGuards(JwtGuard, ReceptionistGuard)
  @Get('doctor')
  async getDoctor(@Request() req: any) {
    return this.ReceptionistService.getDoctor(req);
  }

  @UseGuards(JwtGuard, ReceptionistGuard)
  @Post('queue')
  async addQueue(@Request() req: any, @Body() dto: AddQueue) {
    return this.ReceptionistService.addQueue(req, dto);
  }

  @UseGuards(JwtGuard, ReceptionistGuard)
  @Get('patient/:phone')
  async searchPatient(@Param('phone') phone: string) {
    return this.ReceptionistService.searchPatient(phone);
  }

  @UseGuards(JwtGuard, ReceptionistGuard)
  @Get('patientid/:id')
  async getPatient(@Param('id') id: string) {
    return this.ReceptionistService.getPatient(parseInt(id));
  }

}
