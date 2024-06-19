import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Role } from '../enums/role.enum';

export class CreateUserDTO {

    @IsString()
    username: string;

    @IsString()
    password: string;

    role?: Role;
}