import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AddService {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    master_service_id : number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    medical_history_id : number;
}

export class EditMedicalHistory{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    note: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    medicine?: string;
}
export class EditMedicalHistoryPharmacy{
    @ApiProperty()
    @IsString()
    @IsOptional()
    medicine?: string;
}
