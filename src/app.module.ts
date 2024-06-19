import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BadgeModule } from './badge/badge.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './.env',
  }),BadgeModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
