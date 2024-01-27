import { TASK_STATUS } from "../constant";
import { ITask } from "../data/model/task.model";
import { IUser } from "../data/model/user.model";
import { AuthDAO } from "../data/repository/AuthDAO";
import { TaskDAO } from "../data/repository/TaskDAO";
import { Request, Response } from "express";

export class TaskService {

    taskDAO: TaskDAO;
    authDAO: AuthDAO

    constructor() {
        this.taskDAO = new TaskDAO();
        this.authDAO = new AuthDAO();
    }

    async createTaskByUserId(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { task }: any = req.body;
            console.log(task)
            const user: IUser | null = await this.authDAO.getUserByEmail(task.userId);

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
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async getTasksByUserId(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { userId } = req.body;

            const user: IUser | null = await this.authDAO.getUserByEmail(userId);

            if (!user) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }

            const tasks: ITask[] = await this.taskDAO.getTasksByUserId(userId);

            res.status(200).json({
                status: 200,
                success: true,
                message: `Found ${tasks.length} tasks`,
                tasks: tasks,
            });
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async updateSatusByTaskId(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { taskId, userId, taskStatus } = req.body;

            const user: IUser | null = await this.authDAO.getUserByEmail(userId);

            if (!user) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }

            const task: ITask = await this.taskDAO.getTaskByTaskId(taskId);

            task.status = taskStatus;

            await task.save();

            res.status(200).json({
                status: 200,
                success: true,
                message: `updated task status to `,
                tasks: task,
            });
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async getAnalyticsByUserId(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { userId } = req.body;

            const user: IUser | null = await this.authDAO.getUserByEmail(userId);

            if (!user) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }

            const tasks: ITask[] = await this.taskDAO.getTasksByUserId(userId);

            const statusCountMap: Record<TASK_STATUS, { value: number; label: TASK_STATUS; id: TASK_STATUS }> = {
                [TASK_STATUS.IN_PROGRESS]: {
                    value: 0,
                    label: TASK_STATUS.IN_PROGRESS,
                    id: TASK_STATUS.IN_PROGRESS
                },
                [TASK_STATUS.COMPLETED]: {
                    value: 0,
                    label: TASK_STATUS.COMPLETED,
                    id: TASK_STATUS.COMPLETED
                },
                [TASK_STATUS.PENDING]: {
                    value: 0,
                    label: TASK_STATUS.PENDING,
                    id: TASK_STATUS.PENDING
                },
            };

            tasks.forEach((task: ITask) => {
                statusCountMap[task.status].value++;
            });

            const statusCounts: { status: TASK_STATUS; count: { value: number; label: TASK_STATUS; id: TASK_STATUS } }[] = Object.entries(statusCountMap).map(
                ([status, count]) => ({
                    status: status as TASK_STATUS,
                    count,
            }));

            res.status(200).json({
                    status: 200,
                    success: true,
                    message: 'success',
                    counts: statusCounts,
                });
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async deleteTask(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { userId, taskId } = req.body;

            const user: IUser | null = await this.authDAO.getUserByEmail(userId);

            if (!user) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }

            const task: ITask = await this.taskDAO.getTaskByTaskId(taskId);

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
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async updateTask(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { userId, task } = req.body;

            const user: IUser | null = await this.authDAO.getUserByEmail(userId);

            if (!user) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }
            console.log(task)
            const result: any = await this.taskDAO.updateTask(task);
            console.log(result)
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
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
}