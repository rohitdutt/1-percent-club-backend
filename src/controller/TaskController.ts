import { TaskService } from "../service/TaskService";
import { Request, Response } from "express";

export class TaskController{

    taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    async createTaskByUserId(req: Request, res: Response): Promise<Response | undefined> {
        return await this.taskService.createTaskByUserId(req, res);
    }

    async getTasksByUserId(req: Request, res: Response): Promise<Response | undefined> {
        return await this.taskService.getTasksByUserId(req, res);
    }

    async updateSatusByTaskId(req: Request, res: Response): Promise<Response | undefined> {
        return await this.taskService.updateSatusByTaskId(req, res);
    }
    
    async getAnalyticsByUserId(req: Request, res: Response): Promise<Response | undefined> {
        return await this.taskService.getAnalyticsByUserId(req, res);
    }

    async deleteTask(req: Request, res: Response): Promise<Response | undefined> {
        return await this.taskService.deleteTask(req, res);
    }

    async updateTask(req: Request, res: Response): Promise<Response | undefined> {
        return await this.taskService.updateTask(req, res);
    }
}