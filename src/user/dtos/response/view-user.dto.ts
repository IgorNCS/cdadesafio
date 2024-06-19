import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Role } from "../enums/role.enum";

export class ViewUserDTO {
  @ApiProperty({
    description: "ID do User",
    example: 1,
    type:Number
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "nome do usuário.",
    example: "iguinho",
    type:String
  })
  @IsString()
  username: string;

  role?: Role;

}
