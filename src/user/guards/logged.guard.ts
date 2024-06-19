import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export class LoggedGuard implements CanActivate {

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const tokenAlreadyExist = this.verifyTokenFromHeader(request) || this.getCookie(request);

        if (tokenAlreadyExist) {
            throw new BadRequestException("You cannot do this if you are already logged in");
        }
        return true;
    }

    private verifyTokenFromHeader(req: Request) {
        return req.headers.authorization;
    }

    private getCookie(req: Request) {
        const cookie = req.cookies.access_token;
        return cookie;
    }


}