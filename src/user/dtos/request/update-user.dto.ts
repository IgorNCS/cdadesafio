import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateUserDTO {

    @ApiProperty({
        type: String,
        required: false,
        example: 'iguinho2',
        description: 'Novo nome do usuário.'
      })
    @IsString()
    updateUsername?: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'iguinhosenha123',
        description: 'Senha atual do usuário.'
      })
    @IsString()
    updatePassword: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'iguinhosenha123',
        description: 'confirmação da senha atual do usuário.'
      })
    @IsString()
    updateConfirmPassword: string;

    @ApiProperty({
        type: String,
        required: false,
        example: 'novasenha123',
        description: 'Nova senha do usuário que será criado.'
      })
    @IsString()
    password: string;

}