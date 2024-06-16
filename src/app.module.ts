import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BadgeModule } from './badge/badge.module';

@Module({
  imports: [BadgeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
