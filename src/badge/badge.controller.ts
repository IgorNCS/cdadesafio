import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { Response } from 'express';
import { RegisterBadgeDTO } from './dtos/request/register-badge.dto';
import { UpdateBadgeDTO } from './dtos/request/update-badge.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RemoveBadgeDTO } from './dtos/request/remove-badge.dto';

@Controller('badge')
export class BadgeController {
        constructor(private badgeService: BadgeService) { }

        @Get('getAll')
        async allBadges(@Res() res: Response) {

                const allbadges = await this.badgeService.getAllBadge();
                return res.status(HttpStatus.OK).json({ allbadges });
        }

        @Get('')
        async getBadges(
                @Query('page') page: number,
                @Query('limit') limit: number,
                @Res() res: Response) {

                const { data, total } = await this.badgeService.getBadges(page||1, limit||10);

                return res.status(HttpStatus.OK).json({ data, total });

        }


        @Get('userBadges/:userId')
        async allUserBadges(@Param('userId') id: number, @Res() res: Response) {
                const allbadges = await this.badgeService.getByUser(id);
                return res.status(HttpStatus.OK).json({ allbadges });
        }

        @UseGuards(AuthGuard)
        @Get('redeemBadge/:slug')
        async redeemBadge(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
                const allbadges = await this.badgeService.redeemBadge(slug, req);
                return res.status(HttpStatus.OK).json({ allbadges });
        }

        @UseGuards(AuthGuard)
        @Get('abandonBadge/:slug')
        async abandonBadge(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
                const allbadges = await this.badgeService.abandonBadge(slug, req);
                return res.status(HttpStatus.OK).json({ allbadges });
        }


        @UseGuards(AuthGuard)
        @Post('register')
        async register(@Body() badgeDTO: RegisterBadgeDTO, @Req() req: Request, @Res() res: Response) {
                const badge = await this.badgeService.registerBadge(badgeDTO, req);
                return res.status(HttpStatus.CREATED).json(badge);
        }


        @UseGuards(AuthGuard)
        @Post('removeBadge')
        async removeBadge(@Body() removeBadge:RemoveBadgeDTO, @Req() req: Request, @Res() res: Response) {
                const allbadges = await this.badgeService.removeBadge(removeBadge, req);
                return res.status(HttpStatus.OK);
        }

        // @UseGuards(AuthGuard)
        // @Put('update/:IdBadge')
        // async update(@Param('IdBadge') id: number, @Body() updateBadge: UpdateBadgeDTO, @Res() res: Response, @Req() req: Request) {
        //         const updatedBadge = await this.badgeService.updateBadge(id, updateBadge, req);
        //         return res.status(HttpStatus.OK).json({ data: updatedBadge, status: HttpStatus.OK });
        // }


}
