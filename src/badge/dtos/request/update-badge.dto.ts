import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isURL } from 'class-validator';

export class UpdateBadgeDTO {

  @IsString()
  slug?: string;

  @IsString()
  name?: string;

  @IsString()
  image?: string;


}
