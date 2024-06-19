import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Role } from '../enums/role.enum';

export class RegisterUserDTO {

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    confirmPassword: string;

    role?: Role;
}