import { Document } from "mongoose";
import { PRIORITY, TASK_STATUS } from "../../constant"

export interface ITask extends Document{
    id: Number,
    userId: string,
    title: string,
    description: string,
    priority: PRIORITY,
    status: TASK_STATUS,
    createdAt: Date,
    updatedAt: Date,
}