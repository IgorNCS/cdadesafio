import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateUserDTO {

    @IsString()
    updateUsername: string;

    @IsString()
    updatePassword: string;

    @IsString()
    updateConfirmPassword: string;

    @IsString()
    password: string;

}