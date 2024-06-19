import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { CreateUserDTO } from '../dtos/request/create-user.dto';
import { UpdateUserDTO } from '../dtos/request/update-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) { }

  async create(userDTO: CreateUserDTO) {
    return await this.prisma.user.create({
      data: userDTO,
    });
  }

  async update(updateUserDTO: UpdateUserDTO, id: number) {
    return await this.prisma.user.update({
      where: { id: id },
      data: {
        ...(updateUserDTO.updatePassword && { password: updateUserDTO.updatePassword }),
        ...(updateUserDTO.updateUsername && { username: updateUserDTO.updateUsername })
      }
    });
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findFirst({ where: { username }, include: { badges: true } });
    return user;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id }, include: { badges: true } });
    return user;
  }

}
