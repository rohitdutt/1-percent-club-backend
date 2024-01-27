    import cors from 'cors';
    import express, { Application, Request, Response } from 'express';
    import dotenv from "dotenv";
    import mongoose from 'mongoose';
    import { AuthController } from './controller/AuthController';
import { TaskController } from './controller/TaskController';


    dotenv.config();

    const app: Application = express();
    const PORT: any = process.env.PORT;

    app.use(cors());
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    const authController: AuthController = new AuthController();
    const taskController: TaskController = new TaskController();

    app.post('/register', async (req: Request, res: Response) => {
        await authController.register(req, res);
    });

    app.post('/login', async (req: Request, res: Response) => {
        await authController.login(req, res);
    });

    app.post('/getTasksByUserId', async (req: Request, res: Response) => {
        await taskController.getTasksByUserId(req, res);
    });

    app.post('/createTaskByUserId', async (req: Request, res: Response) => {
        await taskController.createTaskByUserId(req, res);
    });

    app.post('/updateSatusByTaskId', async (req: Request, res: Response) => {
        await taskController.updateSatusByTaskId(req, res);
    });

    app.post('/getAnalyticsByUserId', async (req: Request, res: Response) => {
        await taskController.getAnalyticsByUserId(req, res);
    });

    app.delete('/deleteTask', async (req: Request, res: Response) => {
        await taskController.deleteTask(req, res);
    });

    app.post('/updateTask', async (req: Request, res: Response) => {
        await taskController.updateTask(req, res);
    });

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });

    try {
        mongoose.connect(process.env.DB_URL as string);
        console.log("connected to db");
    } catch (error) {
        console.log(error)
    }