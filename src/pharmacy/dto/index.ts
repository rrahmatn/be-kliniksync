import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AddServiceDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    master_service_id : number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    medical_history_id : number;
}