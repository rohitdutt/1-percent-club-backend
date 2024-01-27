import { Request, Response } from "express";
import { AuthService } from "../service/AuthService";

export class AuthController{

    authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response): Promise<Response | undefined> {
        return await this.authService.register(req, res);
    }

    async login(req: Request, res: Response): Promise<Response | undefined> {
        return await this.authService.login(req, res);
    }
}