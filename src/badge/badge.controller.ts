import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { Response } from 'express';
import { RegisterBadgeDTO } from './dtos/request/register-badge.dto';
import { UpdateBadgeDTO } from './dtos/request/update-badge.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RemoveOrAddBadgeDTO } from './dtos/request/remove-or-addbadge.dto';
import { RegisterBadgeSwagger, AbandonBadgeSwagger, GetAllBadgesSwagger, GetBadgesSwagger, GetUserBadgesSwagger, RedeemBadgeSwagger, RemoveBadgeSwagger, UpdateBadgeSwagger, GiveBadgeSwagger, AddBadgeSwagger } from './docs/swagger-badge-data';
import { GiveBadgeDTO } from './dtos/request/give-badge.dto';

@Controller('badge')
export class BadgeController {
        constructor(private badgeService: BadgeService) { }

        @GetAllBadgesSwagger()
        @Get('getAll')
        async allBadges(@Res() res: Response) {

                const allbadges = await this.badgeService.getAllBadge();
                return res.status(HttpStatus.OK).json({ allbadges });
        }

        @GetBadgesSwagger()
        @Get('')
        async getBadges(
                @Query('page') page: number,
                @Query('limit') limit: number,
                @Query('name') name: string,
                @Res() res: Response) {

                const { data, total } = await this.badgeService.getBadges(page || 1, limit || 10, name);

                return res.status(HttpStatus.OK).json({ data, total });

        }

        @GetUserBadgesSwagger()
        @Get('userBadges/:userId')
        async allUserBadges(@Param('userId') id: number, @Res() res: Response) {
                const allbadges = await this.badgeService.getByUser(id);
                return res.status(HttpStatus.OK).json(allbadges);
        }

        @RedeemBadgeSwagger()
        @UseGuards(AuthGuard)
        @Get('redeemBadge/:slug')
        async redeemBadge(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
                const allbadges = await this.badgeService.redeemBadge(slug, req);
                return res.status(HttpStatus.OK).json(allbadges);
        }

        @AbandonBadgeSwagger()
        @UseGuards(AuthGuard)
        @Get('abandonBadge/:slug')
        async abandonBadge(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
                const allbadges = await this.badgeService.abandonBadge(slug, req);
                return res.status(HttpStatus.OK).json(allbadges);
        }


        @RegisterBadgeSwagger()
        @UseGuards(AuthGuard)
        @Post('register')
        async register(@Body() badgeDTO: RegisterBadgeDTO, @Req() req: Request, @Res() res: Response) {
                const badge = await this.badgeService.registerBadge(badgeDTO, req);
                return res.status(HttpStatus.CREATED).json(badge);
        }

        @RemoveBadgeSwagger()
        @UseGuards(AuthGuard)
        @Post('removeBadge')
        async removeBadge(@Body() removeBadge: RemoveOrAddBadgeDTO, @Req() req: Request, @Res() res: Response) {
                const allbadges = await this.badgeService.removeBadge(removeBadge, req);
                return res.status(HttpStatus.OK).json(allbadges);
        }

        @AddBadgeSwagger()
        @UseGuards(AuthGuard)
        @Post('addBadge')
        async addBadge(@Body() addBadge: RemoveOrAddBadgeDTO, @Req() req: Request, @Res() res: Response) {
                const allbadges = await this.badgeService.addBadge(addBadge, req);

                return res.status(HttpStatus.OK).json(allbadges);
        }

        @UpdateBadgeSwagger()
        @UseGuards(AuthGuard)
        @Put('update/:IdBadge')
        async update(@Param('IdBadge') id: number, @Body() updateBadge: UpdateBadgeDTO, @Res() res: Response, @Req() req: Request) {
                const updatedBadge = await this.badgeService.updateBadge(id, updateBadge, req);
                return res.status(HttpStatus.OK).json({ data: updatedBadge, status: HttpStatus.OK });
        }

        @GiveBadgeSwagger()
        @UseGuards(AuthGuard)
        @Post('giveBadge')
        async giveBadge(@Body() giveBadge: GiveBadgeDTO, @Res() res: Response, @Req() req: Request) {
                const updatedBadge = await this.badgeService.giveBadge(giveBadge, req);
                return res.status(HttpStatus.OK).json(updatedBadge);
        }


}
