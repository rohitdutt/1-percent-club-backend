import { User } from "../entity/user";
import { IUser } from "../model/user.model";

export class AuthDAO {
    constructor() {
        
    }

    async createUser(user: IUser): Promise<any> {
        return await User.create({
            name: user.name,
            email: user.email,
            password: user.hashedPassword,
        });
    }

    async getUserByEmail(email: string): Promise<any> {
        return User.findOne({
            email: email,
        });
    }

}