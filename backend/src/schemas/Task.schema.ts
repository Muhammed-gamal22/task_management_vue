import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose";


export enum Priority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}
export enum Status {
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done',
}
@Schema({
    timestamps: true,
    collection: "task",
})
export class Task {
    @Prop({ required: [true, "Title is required"] })
    title: string;
    @Prop({ required: [true, "Description is required"] })
    description: string;
    @Prop({
        required: [true, "Status is required"],
        enum: Status,
        default: Status.TODO
    })
    status: Status;
    @Prop({
        required: [true, "Priority is required"],
        enum: Priority,
        default: Priority.MEDIUM
    })
    priority: Priority;
    @Prop({
        type: Date,
        required: [true, 'Due date is required'],
        validate: {
            validator: (value: Date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return value >= today;
            },
            message: 'Due date cannot be in the past',
        },
    })
    due_date: Date;
    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    user: Types.ObjectId;
}
export const TaskSchema = SchemaFactory.createForClass(Task)