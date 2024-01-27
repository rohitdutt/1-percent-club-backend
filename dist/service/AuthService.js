"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AuthDAO_1 = require("../data/repository/AuthDAO");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    constructor() {
        this.saltRounds = 10;
        this.authDAO = new AuthDAO_1.AuthDAO();
    }
    async login(req, res) {
        try {
            const user = req.body;
            const { email, password } = user;
            const isUserExist = await this.authDAO.getUserByEmail(email);
            if (!isUserExist) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "User not found",
                });
                return;
            }
            const isPasswordMatched = await bcrypt_1.default.compare(password, isUserExist.password);
            // if not matched send response that wrong password;
            if (!isPasswordMatched) {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: "wrong password",
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ _id: isUserExist?._id, email: isUserExist?.email }, "YOUR_SECRET", {
                expiresIn: "1d",
            });
            res.status(200).json({
                status: 200,
                success: true,
                message: "login success",
                token: token,
                userId: email
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
    async register(req, res) {
        try {
            const user = req.body;
            const { name, email, password } = user;
            const isEmailAllReadyExist = await this.authDAO.getUserByEmail(email);
            if (isEmailAllReadyExist) {
                res.status(400).json({
                    status: 400,
                    message: "Email already in use",
                });
                return;
            }
            const salt = await bcrypt_1.default.genSalt(this.saltRounds);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            const newUser = await this.authDAO.createUser({ name, email, hashedPassword });
            res.status(200).json({
                status: 201,
                success: true,
                message: " User created Successfully",
                user: newUser,
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
exports.AuthService = AuthService;
