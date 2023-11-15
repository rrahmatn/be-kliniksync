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
import { PharmacyService } from './pharmacy.service';
import { JwtGuard, PharmacyGuard } from 'src/auth/guard';
import { ChangePassword, EditUser } from 'src/global-dto';
import { EditMedicalHistoryPharmacy } from 'src/doctor/dto';

@Controller('pharmacy')
@ApiTags('pharmacy')
@ApiBearerAuth()
export class PharmacyController {
  constructor(private PharmacyServices: PharmacyService) {}

  @UseGuards(JwtGuard, PharmacyGuard)
  @Get()
  async getPharmacy(@Request() req: any) {
    return this.PharmacyServices.getUser(req);
  }
  @UseGuards(JwtGuard, PharmacyGuard)
  @Patch()
  async editPharmacy(@Request() req: any, @Body() dto: EditUser) {
    return this.PharmacyServices.editPharmacy(req, dto);
  }
  @UseGuards(JwtGuard, PharmacyGuard)
  @Patch('changepassword')
  async changePasswordPharmacy(
    @Request() req: any,
    @Body() dto: ChangePassword,
  ) {
    return this.PharmacyServices.changePassword(req, dto);
  }

  @UseGuards(JwtGuard, PharmacyGuard)
  @Get('queue')
  async getQueue(@Request() req: any) {
    return this.PharmacyServices.getQueue(req);
  }

  @UseGuards(JwtGuard, PharmacyGuard)
  @Get('service')
  async getService(@Request() req: any) {
    return this.PharmacyServices.getService(req);
  }

  @UseGuards(JwtGuard, PharmacyGuard)
  @Post('service')
  async addService(@Request() req: any) {
    return this.PharmacyServices.addService(req);
  }
  @UseGuards(JwtGuard, PharmacyGuard)
  @Patch('medicalhistory/:id')
  async editMEdicalHistory(@Param('id') id : string ,@Request() req : any ,@Body() dto : EditMedicalHistoryPharmacy) {
    return this.PharmacyServices.editMedicalHistory(parseInt(id) ,req, dto);
  }


}
