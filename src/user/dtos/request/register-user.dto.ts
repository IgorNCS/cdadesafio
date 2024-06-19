import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { Role } from '../enums/role.enum';

export class RegisterUserDTO {

    @ApiProperty({
        type: String,
        required: true,
        example: 'iguinho',
        description: 'Nome do usuario que será criado.'
    })
    @IsString()
    username: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'iguinhosenha123',
        description: 'Senha do usuario que será criado.'
    })
    @IsString()
    password: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'iguinhosenha123',
        description: 'Confirmação da senha do usuario que será criado.'
    })
    @IsString()
    confirmPassword: string;

    @ApiProperty({
        type: String,
        required: false,
        example: Role.ADMIN,
        description: 'Cargo do usuário.',
        default: Role.COMMON,
        enum: [Role.ADMIN, Role.COMMON],
    })
    @IsEnum(Role)
    role?: Role;
}