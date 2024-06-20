import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isURL } from 'class-validator';

export class GiveBadgeDTO {

  @ApiProperty({
    type: String,
    required: true,
    example: 'cda',
    description: 'Badge que será doado.'
  })
  @IsString()
  slug: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
    description: 'ID do usuário recebedor do Badge.'
  })
  @IsString()
  userRecieveId: number;



}
