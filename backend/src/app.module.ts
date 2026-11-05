import { Module } from "@nestjs/common";
import { TaskController } from "./tasksController";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./schemas/Task.schema";
import { TaskModule } from "./task.module";
import { UserModule } from "./user.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("DATABASE")
      })
    }),
    TaskModule,
    UserModule
  ],
})
export class AppModule { }
