import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { UpdateBadgeDTO } from '../dtos/request/update-badge.dto';
import { RegisterBadgeDTO } from '../dtos/request/register-badge.dto';

@Injectable()
export class BadgeRepository {
    constructor(private prisma: PrismaService) { }

    async create(badgeDTO: RegisterBadgeDTO) {
      const { slug, name, image } = badgeDTO;

      return await this.prisma.$transaction(async (prisma) => {
          const badge = await prisma.badge.create({
              data: {
                  slug,
                  name,
                  image,
              },
          });

          return badge;
      });
  }

    async update(updateBadge: UpdateBadgeDTO, id: number) {
        return await this.prisma.badge.update({
            where: { id: id },
            data: {
                ...(updateBadge.name && { name: updateBadge.name }),
                ...(updateBadge.image && { image: updateBadge.image }),
                ...(updateBadge.slug && { slug: updateBadge.slug }),
            },
        });
    }

    async findAll() {
        return await this.prisma.badge.findMany();
    }

    async findBySlug(slug: string) {
        return await this.prisma.badge.findFirst({ where: { slug: slug } });
    }

    async findById(id: number) {
        return await this.prisma.badge.findFirst({ where: { id: id } });
    }

    async findByUser(id: number) {
        return await this.prisma.badgeUser.findMany({ where: { userId: id },include:{ badge: true } });
    }

    async findByUserId(userId: number) {
        return await this.prisma.user.findUnique({
            where: { id: userId },
            include: { badges: true },
        });
    }

    async getBadges(page: number, limit: number, name?: string) {
        const skip = (page - 1) * limit;
        
        const [data, total] = await this.prisma.$transaction([
            this.prisma.badge.findMany({
                skip,
                take: limit,
                where: name ? { name: { contains: name, mode: 'insensitive' } } : {},
            }),
            this.prisma.badge.count({
                where: name ? { name: { contains: name, mode: 'insensitive' } } : {},
            }),
        ]);
    
        return { data, total };
    }

    async addUserBadge(userId: number, badgeId: number) {
        await this.prisma.badgeUser.create({
          data: {
            userId: userId,
            badgeId: badgeId,
          },
        });
      }

      async delUserBadge(userId: number, badgeId: number) {
        await this.prisma.badgeUser.delete({
            where: {
                userId_badgeId: {
                    userId: userId,
                    badgeId: badgeId
                }
            }
        });
    }
    
}
