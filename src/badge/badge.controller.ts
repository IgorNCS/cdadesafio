import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { Response } from 'express';

@Controller('badge')
export class BadgeController {
constructor (private badgeService: BadgeService){}

@Get('')
allbadges(){

}

@Post()
async register(@Body() badgeDTO, @Res() res: Response){

}
}
