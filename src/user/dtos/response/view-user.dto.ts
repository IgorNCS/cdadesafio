import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Role } from "../enums/role.enum";

export class ViewUserDTO {
  @ApiProperty({
    description: "ID do User",
    example: 1
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "username do User",
    example: "iguinho"
  })
  @IsString()
  username: string;

  role?: Role;

}
