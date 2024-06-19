
import { ViewBadgeDTO } from '../dtos/response/view-badge.dto';


export class BadgeBuilder {
  static createViewBadge(badge): ViewBadgeDTO {
    const { name, slug, image } = badge;

    return { name, slug, image };
  }
}

