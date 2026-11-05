import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserMethods } from "./schemas/User.schema";
import { Model } from "mongoose";
import { LoginDto } from "./dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dtos/register.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User, {}, UserMethods>,
        private readonly jwtService: JwtService
    ) { }
    async login(loginDto: LoginDto) {
        const user = await this.userModel.findOne({ email: loginDto.email }).select('+password');
        if (!user || !(await user.comparePassword(loginDto.password))) {
            throw new UnauthorizedException("Invalid credentials");
        }
        const token = this.jwtService.sign({ id: user._id });
        user.password = undefined;
        return { token, user };
    }
    async register(registerDto: RegisterDto) {
        const userExists = await this.userModel.findOne({
            email: registerDto.email,
        });

        if (userExists) {
            throw new ConflictException('User with this email already exists');
        }

        const user = await this.userModel.create(registerDto);

        const token = this.jwtService.sign({
            id: user._id.toString(),
        });

        const userResponse = user.toObject();

        delete userResponse.password;
        delete userResponse.confirmPassword;

        return {
            status: 'success',
            token,
            user: userResponse,
            message: 'User registered successfully',
        };
    }

    async findById(id: string) {
        return this.userModel.findById(id).exec();
    }
}