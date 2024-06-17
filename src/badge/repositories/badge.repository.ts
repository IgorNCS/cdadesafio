import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { RegisterBadgeDTO } from '../dtos/request/register-badge.dto';


@Injectable()
export class BadgeRepository {
  constructor(private prisma: PrismaService) { }

  async create(badgeDTO) {
    return await this.prisma.badge.create({
      data: badgeDTO,
    });
  }

  async findAll() {
    const badges = await this.prisma.badge.findMany();
    return badges;
  }

  async findBySlug(slug: string) {
    const badge = await this.prisma.badge.findFirst({ where: { slug:slug } });
    return badge;
  }

}
