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
import { SuperAdminService } from './superadmin.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard, SuperAdminGuard } from 'src/auth/guard';
import { SuperAdminDto } from 'src/auth/dto';
import {
  ChangePasswordClinic,
  CreateNewClinicDto,
  EditClinic,
  EditSuperAdminDto,
} from './dto';

@Controller('superadmin')
@ApiTags('superadmin')
@ApiBearerAuth()
export class SuperAdminController {
  constructor(private superAdminService: SuperAdminService) {}

  //   @UseGuards(SuperAdminGuard, JwtGuard)
  @Post('')
  createSuperAdmin(@Body() dto: SuperAdminDto) {
    return this.superAdminService.createSuperAdmin(dto);
  }

  @UseGuards(SuperAdminGuard, JwtGuard)
  @Patch('delete/:id')
  deleteSuperAdmin(@Param('id') id: string) {
    return this.superAdminService.deleteSuperAdmin(parseInt(id));
  }

  @UseGuards(SuperAdminGuard, JwtGuard)
  @Patch('')
  editSuperAdmin(@Request() req: any, @Body() dto: EditSuperAdminDto) {
    return this.superAdminService.editSuperAdmin(req, dto);
  }

  @UseGuards(SuperAdminGuard, JwtGuard)
  @Patch('clinic/:id')
  editClinic(@Param('id') id: string, @Body() dto: EditClinic) {
    return this.superAdminService.editClinic(parseInt(id), dto);
  }
  @UseGuards(SuperAdminGuard, JwtGuard)
  @Patch('clinic/delete/:id')
  deleteClinic(@Param('id') id: string) {
    return this.superAdminService.deleteClinic(parseInt(id));
  }

  @UseGuards(JwtGuard, SuperAdminGuard)
  @Post('clinic')
  createNewClinic(@Body() dto: CreateNewClinicDto) {
    return this.superAdminService.createNewClinic(dto);
  }
  @UseGuards(JwtGuard, SuperAdminGuard)
  @Get('clinic')
  getAllClinic() {
    return this.superAdminService.getAllClinic();
  }

  @UseGuards(JwtGuard, SuperAdminGuard)
  @Get('clinic/:id')
  getClinicById(@Param('id') id: string) {
    return this.superAdminService.getClinicById(parseInt(id));
  }

  @UseGuards(JwtGuard, SuperAdminGuard)
  @Patch('clinic/payment/:id')
  clinicPayment(@Param('id') id: string) {
    return this.superAdminService.clinicPayment(parseInt(id));
  }
  @UseGuards(JwtGuard, SuperAdminGuard)
  @Patch('clinic/changepassword/:id')
  changePasswordClini(
    @Param('id') id: string,
    @Body() dto: ChangePasswordClinic,
  ) {
    return this.superAdminService.changePasswordClinic(parseInt(id), dto);
  }
}
