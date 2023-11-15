import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import {
  ChangePassword,
  EditClinicDto,
  EditDoctor,
  EditEmployes,
  EditMasterService,
  ForceChangePassword,
  MasterService,
  NewDoctor,
  NewEmpolye,
} from './dto';
import { ClinicService } from './clinic.service';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('admin')
@ApiTags('clinic')
@ApiBearerAuth()
export class ClinicController {
  constructor(
    private clinicService: ClinicService,
    private jwtService: JwtService,
    private Config: ConfigService,
  ) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Get()
  async getClinic(@Request() req: any) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.Config.get('JWT_SECRET'),
    });

    return this.clinicService.getClinic(payload.sub);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch()
  async editClinic(@Body() dto: EditClinicDto, @Request() req: any) {
    const token = req.headers.authorization?.split(' ') ?? [];
    const accessToken = token[1];

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.Config.get('JWT_SECRET'),
    });

    return this.clinicService.editClinic(payload.sub, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('changepassword')
  async changePassword(@Body() dto: ChangePassword, @Request() req: any) {
    return this.clinicService.changePassword(req, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Post('doctor')
  async createNewDoctor(@Request() req: any, @Body() dto: NewDoctor) {
    return this.clinicService.createNewDoctor(req, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Post('receptionist')
  async createNewReceptionist(@Request() req: any, @Body() dto: NewEmpolye) {
    return this.clinicService.createNewReceptionist(req, dto);
  }
  @UseGuards(JwtGuard, AdminGuard)
  @Post('cashier')
  async createNewCashier(@Request() req: any, @Body() dto: NewEmpolye) {
    return this.clinicService.createNewCashier(req, dto);
  }
  @UseGuards(JwtGuard, AdminGuard)
  @Post('pharmacy')
  async createNewPharmacy(@Request() req: any, @Body() dto: NewEmpolye) {
    return this.clinicService.createNewPharmacy(req, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Get('employes')
  getAllEmployes(@Request() req: any) {
    return this.clinicService.getAllEmployes(req);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('changepassword/receptionist/:id')
  changePasswordReceptionist(
    @Param('id') id: string,
    @Request() req: any,
    @Body()
    dto: ForceChangePassword,
  ) {
    return this.clinicService.changePasswordReceptionist(
      parseInt(id),
      req,
      dto,
    );
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('changepassword/doctor/:id')
  changePasswordDoctor(
    @Param('id') id: string,
    @Request() req: any,
    @Body()
    dto: ForceChangePassword,
  ) {
    return this.clinicService.changePasswordDoctor(parseInt(id), req, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('changepassword/pharmacy/:id')
  changePasswordPharmacy(
    @Param('id') id: string,
    @Request() req: any,
    @Body()
    dto: ForceChangePassword,
  ) {
    return this.clinicService.changePasswordPharmacy(parseInt(id), req, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('changepassword/cashier/:id')
  changePasswordCashier(
    @Param('id') id: string,
    @Request() req: any,
    @Body()
    dto: ForceChangePassword,
  ) {
    return this.clinicService.changePasswordCashier(parseInt(id), req, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('delete/receptionist/:id')
  deleteReceptionist(@Param('id') id: string, @Request() req: any) {
    return this.clinicService.deleteReceptionist(parseInt(id), req);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('delete/doctor/:id')
  deleteDoctor(@Param('id') id: string, @Request() req: any) {
    return this.clinicService.deleteDoctor(parseInt(id), req);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('delete/pharmacy/:id')
  deletePharmacy(@Param('id') id: string, @Request() req: any) {
    return this.clinicService.deletePharmacy(parseInt(id), req);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('delete/cashier/:id')
  deleteCashier(@Param('id') id: string, @Request() req: any) {
    return this.clinicService.deleteCashier(parseInt(id), req);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('edit/receptionist/:id')
  editReceptionist(
    @Param('id') id: string,
    @Request() req: any,
    @Body()
    dto: EditEmployes,
  ) {
    return this.clinicService.editReceptionist(parseInt(id), req, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('edit/doctor/:id')
  editDoctor(
    @Param('id') id: string,
    @Request() req: any,
    @Body()
    dto: EditDoctor,
  ) {
    return this.clinicService.editDoctor(parseInt(id), req, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('edit/pharmacy/:id')
  editPharmacy(
    @Param('id') id: string,
    @Request() req: any,
    @Body()
    dto: EditEmployes,
  ) {
    return this.clinicService.editPharmacy(parseInt(id), req, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('edit/pharmacy/:id')
  editCashier(
    @Param('id') id: string,
    @Request() req: any,
    @Body()
    dto: EditEmployes,
  ) {
    return this.clinicService.editCashier(parseInt(id), req, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Get('receptionist/:id')
  getReceptionistById(@Param('id') id: string, @Request() req: any) {
    return this.clinicService.getReceptionistById(parseInt(id), req);
  }
  @UseGuards(JwtGuard, AdminGuard)
  @Get('doctor/:id')
  getDoctorById(@Param('id') id: string, @Request() req: any) {
    return this.clinicService.getDoctorById(parseInt(id), req);
  }
  @UseGuards(JwtGuard, AdminGuard)
  @Get('pharmacy/:id')
  getPharmacyById(@Param('id') id: string, @Request() req: any) {
    return this.clinicService.getPharmacyById(parseInt(id), req);
  }
  @UseGuards(JwtGuard, AdminGuard)
  @Get('cashier/:id')
  getCashier(@Param('id') id: string, @Request() req: any) {
    return this.clinicService.getCashierById(parseInt(id), req);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Get('masterservice')
  getMasterService(@Request() req: any) {
    return this.clinicService.getAllMasterService(req)
  }
  @UseGuards(JwtGuard, AdminGuard)
  @Get('masterservice/:id')
  getMasterServiceById(@Param('id') id : string ,@Request() req: any) {
    return this.clinicService.getAllMasterServiceById(parseInt(id) , req)
  }
  @UseGuards(JwtGuard, AdminGuard)
  @Post('masterservice')
  createMasterService(@Request() req: any, @Body() dto: MasterService) {
    return this.clinicService.createMasterService(req, dto);
  }
  @UseGuards(JwtGuard, AdminGuard)
  @Patch('masterservice/:id')
  editMasterService(
    @Param('id') id: string,
    @Request() req: any,
    @Body() dto: EditMasterService,
  ) {
    return this.clinicService.editMasterService(parseInt(id), req, dto);
  }
  @UseGuards(JwtGuard, AdminGuard)
  @Patch('masterservice/delete/:id')
  deleteMasterService(@Param('id') id: string, @Request() req: any) {
    return this.clinicService.deleteMasterService(parseInt(id), req);
  }
  @UseGuards(JwtGuard, AdminGuard)
  @Get('transaction/:page')
  getTransaction(@Param('page') id: string, @Request() req: any) {
    return this.clinicService.getTransaction(parseInt(id), req);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Get('transactionbyid/:id')
  getTransactionById(@Param('id') id: string, @Request() req: any) {
    return this.clinicService.getTransactionById(parseInt(id), req);
  }
}
