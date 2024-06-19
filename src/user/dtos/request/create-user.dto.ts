import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { Role } from '../enums/role.enum';

export class CreateUserDTO {

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
        example: '$@#grteg34fgsd43',
        description: 'Senha do usuário que será criado, passada em hash.'
      })
    @IsString()
    password: string;

    @ApiProperty({
        type: Role,
        enum:[Role.ADMIN,Role.COMMON],
        required: false,
        example: Role.ADMIN,
        description: 'Cargo do usuário.',
        default:Role.COMMON
      })
      @IsEnum(Role)
    role?: Role;
}