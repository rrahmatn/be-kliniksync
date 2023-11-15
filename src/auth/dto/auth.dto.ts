import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SuperAdminDto{ 

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    confPassword:string;

}

export class Signin{ 

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string;

}

export class GetNewAccesToken{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    refresh_token : string
}

export class CheckEmail{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email : string
}