import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterBadgeDTO } from './dtos/request/register-badge.dto';
import { BadgeRepository } from './repositories/badge.repository';
import { ViewBadgeDTO } from './dtos/response/view-badge.dto';
import { BadgeBuilder } from './builder/badge.build';
import { UpdateBadgeDTO } from './dtos/request/update-badge.dto';

@Injectable()
export class BadgeService {
    constructor(private badgeRepository: BadgeRepository) { }

    async registerBadge(registerBadge: RegisterBadgeDTO, req) {
        const userId = req.user.id;

        const createBadgeDTO = { ...registerBadge, userId };
        if(await this.getBySlug(registerBadge.slug)){
            throw new UnauthorizedException('slug already exist');
        }
        const createdBadge = await this.badgeRepository.create(createBadgeDTO);

        const viewCreatedBadge: ViewBadgeDTO = BadgeBuilder.createViewBadge(createdBadge)
        return viewCreatedBadge;

    }

    async getAllBadge() {
        const allBadges = await this.badgeRepository.findAll();
        const viewAllBadge: ViewBadgeDTO[] = allBadges.map(badge => BadgeBuilder.createViewBadge(badge));
        return viewAllBadge;
    }

    async getBySlug(badgeSlug: string) {
        const badge = await this.badgeRepository.findBySlug(badgeSlug)
        const viewBadge: ViewBadgeDTO = BadgeBuilder.createViewBadge(badge)
        return viewBadge;
    }

    async updateBadge(updateBadge:UpdateBadgeDTO){
        
        if(await this.getBySlug(updateBadge.slug)){
            throw new UnauthorizedException('slug already exist');
        }
    }
}
