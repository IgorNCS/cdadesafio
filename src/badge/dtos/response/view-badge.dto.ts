import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString, IsUrl } from "class-validator";

export class ViewBadgeDTO {

  @ApiProperty({
    type: String,
    required: true,
    example: 'cda',
    description: 'slug do Badge'
  })
  @IsString()
  slug: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Cidade Alta',
    description: 'Nome do Badge'
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    description: 'URL do Badge'
  })
  @IsUrl()
  image: string;

}