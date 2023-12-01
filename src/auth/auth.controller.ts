import {
  Controller,
  Post,
  Body,
  HttpCode,
  Request,
  ForbiddenException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SuperAdminDto, Signin, CheckEmail } from './dto';
import { JwtGuard, RtGuard, SuperAdminGuard } from './guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('checkemail')
  async checkEmail(@Body() req: CheckEmail) {
    return this.authService.checkEmail(req.email);
  }

  @Post('signin')
  async signin(@Body() req: Signin) {
    return this.authService.signin(req);
  }
  @UseGuards(RtGuard)
  @Get('refresh-token')
  async refresh(@Request() req: any) {
    const refreshToken = req.headers.authorization?.split(' ') ?? [];
    if (!refreshToken[1]) {
      throw new ForbiddenException('Refresh token tidak valid');
    }

    const newTokens = await this.authService.refreshToken(refreshToken[1]);
    return newTokens;
  }


  @Get('/')
  async getAku(){
    return {
      "ini" : "aku"
    }
  }
}
