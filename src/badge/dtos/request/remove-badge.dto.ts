import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsUrl, IsString, isURL } from 'class-validator';

export class RemoveBadgeDTO {

  @ApiProperty({
    type: String,
    required: true,
    example: 'cda',
    description: 'slug do Badge que será removido de um usuário.'
  })
  @IsString()
  slug: string;
  
  @ApiProperty({
    type: Number,
    required: true,
    example: '1',
    description: 'userID do usuário que terá o Badge removido.'
  })
  @IsNumber()
  userId:number;

}
