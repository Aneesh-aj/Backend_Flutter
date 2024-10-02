import userModel  from "../../model/userModel";
import { Iuser } from "../../../../../entities/user";
import {IuserRepository} from "../../repositoryInterface/userRepository"

import {createUser, findbyEmail,getProfile} from "./user/ index"

export class UserRepository implements IuserRepository{
    constructor(private userModels: typeof userModel){}
    async  createUser(newUser: Iuser): Promise<Iuser> {
        return await  createUser(newUser, this.userModels)
    }

    async findbyEmail(email: string): Promise<void | Iuser> {
        return await findbyEmail(this.userModels,email)
    }
    
    async getProfile(userId: string): Promise<Iuser | void> {
        return await getProfile(this.userModels,userId)
    }
    
    
}