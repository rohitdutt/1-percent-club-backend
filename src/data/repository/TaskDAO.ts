import { Task } from "../entity/task";
import { User } from "../entity/user";
import { ITask } from "../model/task.model";

export class TaskDAO {
    constructor() {
        
    }

    async createTask(task: ITask): Promise<void> {
        await Task.create(task);
    }

    async getTasksByUserId(userId: string): Promise<ITask[]> {
        return await Task.find({ userId: userId });
    }

    async getTaskByTaskId(taskId: string): Promise<ITask> {
        return await Task.findById(taskId);
    }

    async deletedTaskByTaskId(taskId: string): Promise<void>{
        await Task.deleteOne({ _id: taskId });
    }

    async updateTask(task: ITask): Promise<any>{
        return await Task.updateOne({ _id: task._id }, { $set: task });
    }
}