import { Module } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';
import { BadgeRepository } from './repositories/badge.repository';
import { PrismaService } from 'src/db/prisma.service';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[UserModule],
  controllers: [BadgeController],
  providers: [BadgeService,BadgeRepository,PrismaService,JwtService,UserService]
})
export class BadgeModule {}
