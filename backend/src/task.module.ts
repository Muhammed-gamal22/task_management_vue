import { Module } from "@nestjs/common";
import { Task, TaskSchema } from "./schemas/Task.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskController } from "./tasksController";
import { TaskService } from "./task.services";
import { UserModule } from "./user.module";
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Task.name,
                collection: "tasks",
                schema: TaskSchema,
            },
        ]),
        UserModule
    ],
    controllers: [TaskController],
    providers: [TaskService],

})
export class TaskModule { }