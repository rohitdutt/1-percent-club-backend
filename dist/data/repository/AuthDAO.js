"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDAO = void 0;
const user_1 = require("../entity/user");
class AuthDAO {
    constructor() {
    }
    async createUser(user) {
        return await user_1.User.create({
            name: user.name,
            email: user.email,
            password: user.hashedPassword,
        });
    }
    async getUserByEmail(email) {
        return user_1.User.findOne({
            email: email,
        });
    }
}
exports.AuthDAO = AuthDAO;
