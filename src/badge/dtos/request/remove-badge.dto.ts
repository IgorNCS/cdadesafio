import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsUrl, IsString, isURL } from 'class-validator';

export class RemoveBadgeDTO {

  @IsString()
  slug: string;
  
  @IsNumber()
  userId:number;

}
