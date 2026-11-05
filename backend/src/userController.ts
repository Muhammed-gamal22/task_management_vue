import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { UserService } from "./user.services";
import { RegisterDto } from "./dtos/register.dto";

@Controller("auth")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }
    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return this.userService.login(loginDto);
    }
    @Post("register")
    async register(@Body() loginDto: RegisterDto) {
        return this.userService.register(loginDto);
    }
}
