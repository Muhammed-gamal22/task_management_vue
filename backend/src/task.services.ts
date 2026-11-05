import { Injectable, Param } from "@nestjs/common";
import { updateTaskDto } from "./dtos/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./schemas/Task.schema";
import { Model } from "mongoose";
import { TaskEntity } from "./task.entity";
import { createTaskDto } from "./dtos/create-task.dto";

@Injectable({})
export class TaskService {
    constructor(
        @InjectModel(Task.name) private readonly taskModal: Model<Task>) { }
    getAllTasks(userId: string): Promise<TaskEntity[]> {
        return this.taskModal.find({ user: userId }).exec();
    }
    getTaskById(id: string): Promise<TaskEntity> {
        return this.taskModal.findById(id).exec();
    }
    createTask(userId: string, task: createTaskDto): Promise<TaskEntity> {
        return this.taskModal.create({
            ...task,
            user: userId,
        })
    }
    updateTask(id: string, updateTaskDto: updateTaskDto): Promise<TaskEntity> {
        return this.taskModal.findByIdAndUpdate(id, updateTaskDto, { new: true, runValidators: true })
    }
    deleteTask(id: string): Promise<TaskEntity> {
        return this.taskModal.findByIdAndDelete(id)
    }
}

