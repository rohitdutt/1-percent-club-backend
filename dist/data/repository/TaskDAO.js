"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDAO = void 0;
const task_1 = require("../entity/task");
class TaskDAO {
    constructor() {
    }
    async createTask(task) {
        await task_1.Task.create(task);
    }
    async getTasksByUserId(userId) {
        return await task_1.Task.find({ userId: userId });
    }
    async getTaskByTaskId(taskId) {
        return await task_1.Task.findById(taskId);
    }
    async deletedTaskByTaskId(taskId) {
        await task_1.Task.deleteOne({ _id: taskId });
    }
    async updateTask(task) {
        return await task_1.Task.updateOne({ _id: task._id }, { $set: task });
    }
}
exports.TaskDAO = TaskDAO;
