import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { createTaskDto } from "./dtos/create-task.dto";
import { updateTaskDto } from "./dtos/update-task.dto";
import { TaskService } from "./task.services";
import { AuthGuard } from "./auth.guard";
import { User, UserDocument } from "./schemas/User.schema";
import { TaskEntity } from "./task.entity";

import { IncomingMessage } from 'http';

interface AuthenticatedRequest extends IncomingMessage {
    user: {
        _id: string;
    };
}

@Controller("tasks")
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }
    @Get()
    findAll(@Req() req: AuthenticatedRequest) {
        const tasks = this.taskService.getAllTasks(req.user!._id);
        return tasks;
    }
    @Post()
    create(@Req() req: AuthenticatedRequest, @Body(ValidationPipe) createTaskDto: createTaskDto) {
        const task = this.taskService.createTask(req.user!._id, createTaskDto);
        return task;
    }
    @Patch(":id")
    update(@Param("id") id: string, @Body(ValidationPipe) updateTaskDto: updateTaskDto) {
        return this.taskService.updateTask(id, updateTaskDto);
    }
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.taskService.deleteTask(id);
    }
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.taskService.getTaskById(id);
    }
}