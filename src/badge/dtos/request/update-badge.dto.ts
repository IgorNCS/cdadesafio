import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isURL } from 'class-validator';

export class UpdateBadgeDTO {

  @ApiProperty({
    type: String,
    required: false,
    example: 'cda',
    description: 'Novo slug do badge que será alterado.'
  })
  @IsString()
  slug?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Cidade Alta Valley',
    description: 'Novo nome do Badge que será alterado.'
  })
  @IsString()
  name?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
    description: 'Novo image/url do Badge que será alterado.'
  })
  @IsString()
  image?: string;


}
