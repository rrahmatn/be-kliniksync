import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class AddPatient {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  birth_date: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gender: 'laki-laki' | 'perempuan';
}

export class EditPatient {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  gender?: 'laki-laki' | 'perempuan';
}

export class AddQueue {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id_patient: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id_doctor: number;
}
