import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { Response } from 'express';
import { RegisterBadgeDTO } from './dtos/request/register-badge.dto';

@Controller('badge')
export class BadgeController {
constructor (private badgeService: BadgeService){}

@Get('')
allbadges(){

}

@Post('register')
async register(@Body() badgeDTO:RegisterBadgeDTO, @Req() req: Request,@Res() res: Response){
    await this.badgeService.registerBadge(badgeDTO,req)
}
}
