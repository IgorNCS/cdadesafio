import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, isURL } from 'class-validator';


export class RegisterBadgeDTO {

  @ApiProperty({
    type: String,
    required: true,
    example: 'cda',
    description: 'slug de registro do Badge'
  })
  @IsString()
  slug: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Cidade Alta',
    description: 'Nome de registro do Badge'
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    description: 'URL de registro do Badge'
  })
  @IsUrl()
  image: string;


}
