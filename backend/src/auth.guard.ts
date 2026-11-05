import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.services";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Unauthorized access to this resource");
        }
        const token = authHeader.split(" ")[1];
        let decoded: { id: string };
        try {
            decoded = await this.jwtService.verifyAsync(token)
        } catch (error) {
            throw new UnauthorizedException("Invalid token");
        }
        const user = await this.userService.findById(decoded.id);
        if (!user) {
            throw new UnauthorizedException("Invalid token");
        }
        req.user = user;
        return true;
    }
}