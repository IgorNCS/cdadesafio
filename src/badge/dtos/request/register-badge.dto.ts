import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isURL } from 'class-validator';

export class RegisterBadgeDTO {

  @IsString()
  slug: string;
  @IsString()
  name:string;
  @IsString()
  imageURL:string;

}
