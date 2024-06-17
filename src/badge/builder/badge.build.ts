
import { ViewBadgeDTO } from '../dtos/response/view-badge.dto';


export class BadgeBuilder {
  static createViewBadge(badge): ViewBadgeDTO {
    const { name, slug, imagemURL, description } = badge;

    return { name, slug, imagemURL, description };
  }
}

