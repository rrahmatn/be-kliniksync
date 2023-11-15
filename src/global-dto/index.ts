import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  isNotEmpty,
} from 'class-validator';

export class EditUser {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ChangePassword {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  confPassword: string;
}
