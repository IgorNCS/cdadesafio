import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class ViewBadgeDTO {

  @IsString()
  name: String;
  @IsString()
  slug: String;
  @IsString()
  imagemURL: String;
  @IsString()
  description: String;

}