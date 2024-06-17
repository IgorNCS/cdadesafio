import { Module } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';
import { BadgeRepository } from './repositories/badge.repository';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [BadgeController],
  providers: [BadgeService,BadgeRepository,PrismaService]
})
export class BadgeModule {}
