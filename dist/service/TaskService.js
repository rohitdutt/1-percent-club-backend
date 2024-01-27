"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const constant_1 = require("../constant");
const AuthDAO_1 = require("../data/repository/AuthDAO");
const TaskDAO_1 = require("../data/repository/TaskDAO");
class TaskService {
    constructor() {
        this.taskDAO = new TaskDAO_1.TaskDAO();
        this.authDAO = new AuthDAO_1.AuthDAO();
    }
    async createTaskByUserId(req, res) {
        try {
            const { task } = req.body;
            console.log(task);
            const user = await this.authDAO.getUserByEmail(task.userId);
            if (!user) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }
            await this.taskDAO.createTask(task);
            res.status(200).json({
                status: 200,
                success: true,
                message: "Task created successfully",
                task: task,
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
    async getTasksByUserId(req, res) {
        try {
            const { userId } = req.body;
            const user = await this.authDAO.getUserByEmail(userId);
            if (!user) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }
            const tasks = await this.taskDAO.getTasksByUserId(userId);
            res.status(200).json({
                status: 200,
                success: true,
                message: `Found ${tasks.length} tasks`,
                tasks: tasks,
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
    async updateSatusByTaskId(req, res) {
        try {
            const { taskId, userId, taskStatus } = req.body;
            const user = await this.authDAO.getUserByEmail(userId);
            if (!user) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }
            const task = await this.taskDAO.getTaskByTaskId(taskId);
            task.status = taskStatus;
            await task.save();
            res.status(200).json({
                status: 200,
                success: true,
                message: `updated task status to `,
                tasks: task,
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
    async getAnalyticsByUserId(req, res) {
        try {
            const { userId } = req.body;
            const user = await this.authDAO.getUserByEmail(userId);
            if (!user) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }
            const tasks = await this.taskDAO.getTasksByUserId(userId);
            const statusCountMap = {
                [constant_1.TASK_STATUS.IN_PROGRESS]: {
                    value: 0,
                    label: constant_1.TASK_STATUS.IN_PROGRESS,
                    id: constant_1.TASK_STATUS.IN_PROGRESS
                },
                [constant_1.TASK_STATUS.COMPLETED]: {
                    value: 0,
                    label: constant_1.TASK_STATUS.COMPLETED,
                    id: constant_1.TASK_STATUS.COMPLETED
                },
                [constant_1.TASK_STATUS.PENDING]: {
                    value: 0,
                    label: constant_1.TASK_STATUS.PENDING,
                    id: constant_1.TASK_STATUS.PENDING
                },
            };
            tasks.forEach((task) => {
                statusCountMap[task.status].value++;
            });
            const statusCounts = Object.entries(statusCountMap).map(([status, count]) => ({
                status: status,
                count,
            }));
            res.status(200).json({
                status: 200,
                success: true,
                message: 'success',
                counts: statusCounts,
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
    async deleteTask(req, res) {
        try {
            const { userId, taskId } = req.body;
            const user = await this.authDAO.getUserByEmail(userId);
            if (!user) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }
            const task = await this.taskDAO.getTaskByTaskId(taskId);
            if (!task) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "Task not found",
                });
                return;
            }
            await this.taskDAO.deletedTaskByTaskId(taskId);
            res.status(200).json({
                status: 200,
                success: true,
                message: 'task deleted successfully',
                task: task
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
    async updateTask(req, res) {
        try {
            const { userId, task } = req.body;
            const user = await this.authDAO.getUserByEmail(userId);
            if (!user) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }
            console.log(task);
            const result = await this.taskDAO.updateTask(task);
            console.log(result);
            if (result.nModified === 0) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Task not found',
                });
            }
            res.status(200).json({
                status: 200,
                success: true,
                message: 'task updated successfully',
                task: task
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
}
exports.TaskService = TaskService;
