import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, isURL } from 'class-validator';

export class RegisterBadgeDTO {

  @IsString()
  slug: string;
  @IsString()
  name:string;
  @IsUrl()
  image:string;
  
  
  @IsOptional()
  @IsString()
  description?: string;

}
