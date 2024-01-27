"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const TaskService_1 = require("../service/TaskService");
class TaskController {
    constructor() {
        this.taskService = new TaskService_1.TaskService();
    }
    async createTaskByUserId(req, res) {
        return await this.taskService.createTaskByUserId(req, res);
    }
    async getTasksByUserId(req, res) {
        return await this.taskService.getTasksByUserId(req, res);
    }
    async updateSatusByTaskId(req, res) {
        return await this.taskService.updateSatusByTaskId(req, res);
    }
    async getAnalyticsByUserId(req, res) {
        return await this.taskService.getAnalyticsByUserId(req, res);
    }
    async deleteTask(req, res) {
        return await this.taskService.deleteTask(req, res);
    }
    async updateTask(req, res) {
        return await this.taskService.updateTask(req, res);
    }
}
exports.TaskController = TaskController;
