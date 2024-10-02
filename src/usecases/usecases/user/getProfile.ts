import { Iuser } from "../../../entities/user";
import { IuserRepository } from "../../../framework/database/mongodb/repositoryInterface/userRepository";
import { Next } from "../../../framework/types/serverPackageTypes";
import ErrorHandler from "../../middleares/errorHandler";


export const getProfile = async(userId:string,userRepoistory:IuserRepository,next:Next):Promise<Iuser | void>=>{
    try{
          const user = await userRepoistory.getProfile(userId)

          if(!user) return  next(new ErrorHandler(400,"user not found"))

            return user
    }catch(error){
        throw error
    }
}