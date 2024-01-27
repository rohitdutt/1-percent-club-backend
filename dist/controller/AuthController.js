"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../service/AuthService");
class AuthController {
    constructor() {
        this.authService = new AuthService_1.AuthService();
    }
    async register(req, res) {
        return await this.authService.register(req, res);
    }
    async login(req, res) {
        return await this.authService.login(req, res);
    }
}
exports.AuthController = AuthController;
