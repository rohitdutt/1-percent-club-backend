import { Request, Response } from "express";
import { AuthDAO } from "../data/repository/AuthDAO";
import jwt from "jsonwebtoken";
import CryptoJS from 'crypto-js';
import bcrypt from 'bcrypt';

export class AuthService {

    saltRounds: number = 10;

    authDAO: AuthDAO;

    constructor() {
        this.authDAO = new AuthDAO();
    }

    async login(req: Request, res: Response): Promise<Response | undefined>{
        try {
            const user: any = req.body;
            const { email, password } = user;

            const isUserExist: any = await this.authDAO.getUserByEmail(email);

            if (!isUserExist) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }
            
            const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

            if (!isPasswordMatched) {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: "wrong password",
                });
                return;
            }
            
            const token = jwt.sign(
                { _id: isUserExist?._id, email: isUserExist?.email },
                "YOUR_SECRET",
                {
                    expiresIn: "1d",
                }
            );

            res.status(200).json({
                status: 200,
                success: true,
                message: "login success",
                token: token,
                userId: email
            });
        } catch (error: any) {
            res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
        }
    }

    async register(req: Request, res: Response): Promise<Response | undefined>{
        try {
            const user: any = req.body;
            const { name, email, password } = user;
            
            const isEmailAllReadyExist = await this.authDAO.getUserByEmail(email);
            if (isEmailAllReadyExist) {
                res.status(400).json({
                    status: 400,
                    message: "Email already in use",
                });
                return;
            }

            const salt = await bcrypt.genSalt(this.saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
 
            const newUser = await this.authDAO.createUser({name, email, hashedPassword})
 
            res.status(200).json({
                status: 201,
                success: true,
                message: " User created Successfully",
                user: newUser,
            });
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
}