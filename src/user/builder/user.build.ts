import { ViewUserDTO } from "../dtos/response/view-user.dto";


export class UserBuilder {
  static createViewUser(user: any): ViewUserDTO {
    const { id, username, role } = user;
    return { id, username, role };
  }
}
