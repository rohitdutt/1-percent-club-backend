"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const AuthController_1 = require("./controller/AuthController");
const TaskController_1 = require("./controller/TaskController");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
const authController = new AuthController_1.AuthController();
const taskController = new TaskController_1.TaskController();
app.post('/register', async (req, res) => {
    await authController.register(req, res);
});
app.post('/login', async (req, res) => {
    await authController.login(req, res);
});
app.post('/getTasksByUserId', async (req, res) => {
    await taskController.getTasksByUserId(req, res);
});
app.post('/createTaskByUserId', async (req, res) => {
    await taskController.createTaskByUserId(req, res);
});
app.post('/updateSatusByTaskId', async (req, res) => {
    await taskController.updateSatusByTaskId(req, res);
});
app.post('/getAnalyticsByUserId', async (req, res) => {
    await taskController.getAnalyticsByUserId(req, res);
});
app.delete('/deleteTask', async (req, res) => {
    await taskController.deleteTask(req, res);
});
app.post('/updateTask', async (req, res) => {
    await taskController.updateTask(req, res);
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
try {
    mongoose_1.default.connect(process.env.DB_URL);
    console.log("connected to db");
}
catch (error) {
    console.log(error);
}
