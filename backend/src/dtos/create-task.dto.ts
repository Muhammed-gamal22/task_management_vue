import { IsEnum, IsNotEmpty, IsString, IsDate, Validate } from "class-validator";
import { Status } from "src/schemas/Task.schema";
import { Priority } from "src/schemas/Task.schema";
import { IsFutureOrToday } from "src/validators/date-validator";
import { Type } from "class-transformer";
export class createTaskDto {
    @IsString({ message: "Title must be a string" })
    @IsNotEmpty({ message: "Title is required" })
    title: string;
    @IsString({ message: "Description must be a string" })
    @IsNotEmpty({ message: "Description is required" })
    description: string;
    @IsEnum(Status)
    status: Status = Status.TODO;
    @IsEnum(Priority)
    priority: Priority = Priority.MEDIUM;
    @IsNotEmpty({ message: 'Due date is required' })
    @IsDate({ message: 'Invalid date' })
    @Type(() => Date)
    @Validate(IsFutureOrToday, {
        message: 'Due date cannot be in the past',
    })
    due_date: Date;
}