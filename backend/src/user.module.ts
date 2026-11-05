import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "./user.services";
import { UserController } from "./userController";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/User.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),

        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: config.get<number>("JWT_EXPIRES_IN") }
            })
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, JwtModule]
})
export class UserModule { }