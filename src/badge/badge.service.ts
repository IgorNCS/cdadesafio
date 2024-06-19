import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterBadgeDTO } from './dtos/request/register-badge.dto';
import { BadgeRepository } from './repositories/badge.repository';
import { ViewBadgeDTO } from './dtos/response/view-badge.dto';
import { BadgeBuilder } from './builder/badge.build';
import { UpdateBadgeDTO } from './dtos/request/update-badge.dto';
import { UserService } from 'src/user/user.service';
import { RemoveBadgeDTO } from './dtos/request/remove-badge.dto';

@Injectable()
export class BadgeService {
    constructor(private badgeRepository: BadgeRepository, private userService: UserService) { }

    async registerBadge(registerBadge: RegisterBadgeDTO, req) {
        const user = req['user'];

        if (user.role !== 'admin') {
            throw new UnauthorizedException("You don't have permission");
        }

        if (await this.verifySlugExist(registerBadge.slug)) {
            throw new UnauthorizedException('Slug already exists');
        }

        const createdBadge = await this.badgeRepository.create(registerBadge);
        const viewCreatedBadge: ViewBadgeDTO = BadgeBuilder.createViewBadge(createdBadge);

        return viewCreatedBadge;
    }

    async getBadges(page: number, limit: number) {
        const { data, total } = await this.badgeRepository.getBadges(page, limit);

        return { data, total };
    }

    async getAllBadge() {
        const allBadges = await this.badgeRepository.findAll();
        const viewAllBadge: ViewBadgeDTO[] = allBadges.map(badge => BadgeBuilder.createViewBadge(badge));
        return viewAllBadge;
    }

    async getBySlug(badgeSlug: string) {
        const badge = await this.badgeRepository.findBySlug(badgeSlug);
        const viewBadge: ViewBadgeDTO = BadgeBuilder.createViewBadge(badge);
        return viewBadge;
    }

    async verifySlugExist(badgeSlug: string) {
        const badge = await this.badgeRepository.findBySlug(badgeSlug);
        return !!badge;
    }

    async getById(badgeId: number) {
        const badge = await this.badgeRepository.findById(badgeId);
        const viewBadge: ViewBadgeDTO = BadgeBuilder.createViewBadge(badge);
        return viewBadge;
    }

    async getByUser(userId: number) {
        const allUserBadge = await this.badgeRepository.findByUser(userId);
        const viewAllUserBadge: ViewBadgeDTO[] = allUserBadge.map(badgeRelation => {
            return BadgeBuilder.createViewBadge(badgeRelation.badge);
        });
        return viewAllUserBadge;
    }

    async updateBadge(id: number, updateBadge: UpdateBadgeDTO, req) {
        const badge = await this.badgeRepository.findById(id);
        const user = req['user'];

        if (!badge) {
            throw new UnauthorizedException('Badge does not exist');
        }

        if (user.role !== 'admin') {
            throw new UnauthorizedException("You don't have permission");
        }

        if (await this.verifySlugExist(updateBadge.slug)) {
            throw new UnauthorizedException('Slug already exists');
        }

        const updatedBadge = await this.badgeRepository.update(updateBadge, id);
        const viewBadge: ViewBadgeDTO = BadgeBuilder.createViewBadge(updatedBadge);

        return viewBadge;
    }

    async redeemBadge(badgeSlug: string, req) {
        const user = req['user'];
        const badge = await this.badgeRepository.findBySlug(badgeSlug);

        if (!badge) {
            throw new UnauthorizedException('Badge not found');
        }
        const userBadges = await this.getByUser(user.id);

        const userBadgeSlugs = userBadges.map(badge => badge.slug) || [];

        if (userBadgeSlugs.includes(badgeSlug)) {
            throw new UnauthorizedException('User already has this badge');
        }

        await this.badgeRepository.addUserBadge(user.id, badge.id);

        return { message: 'Badge redeemed successfully', badge: badge };
    }

    async abandonBadge(badgeSlug: string, req) {
        const user = req['user'];
        const badge = await this.badgeRepository.findBySlug(badgeSlug);

        if (!badge) {
            throw new UnauthorizedException('Badge not found');
        }

        const userBadges = await this.getByUser(user.id);

        const userBadgeSlugs = userBadges.map(badge => badge.slug) || [];

        if (!userBadgeSlugs.includes(badgeSlug)) {
            throw new UnauthorizedException('User hasnt this badge');
        }

        await this.badgeRepository.delUserBadge(user.id, badge.id);

        return { message: 'Badge abandon successfully', badge: badge };
    }

    async removeBadge(removeBadge: RemoveBadgeDTO, req) {
        const user = req['user'];
        const badge = await this.badgeRepository.findBySlug(removeBadge.slug);

        if (user.role !== 'admin') {
            throw new UnauthorizedException("You don't have permission");
        }
        if (!badge) {
            throw new UnauthorizedException('Badge not found');
        }
        const userBadges = await this.getByUser(removeBadge.userId);

        const userBadgeSlugs = userBadges.map(badge => badge.slug) || [];

        if (!userBadgeSlugs.includes(removeBadge.slug)) {
            throw new UnauthorizedException('User hasnt this badge');
        }

        await this.badgeRepository.delUserBadge(user.id, badge.id);

    }


}
