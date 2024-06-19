import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginUserDTO {
    @ApiProperty({
        type: String,
        required: true,
        example: 'iguinho',
        description: 'Nome do usuário cadastrado.'
      })
    @IsString()
    username: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'iguinhosenha123',
        description: 'Senha do usuário cadastrado.'
      })
    @IsString()
    password: string;

}