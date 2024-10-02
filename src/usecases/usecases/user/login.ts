 import { Next } from "../../../framework/types/serverPackageTypes";
import { Ihashpassword } from "../../interface/service/hashPassword";
import ErrorHandler from "../../middleares/errorHandler";
import { IToken, Ijwt } from "../../interface/service/jwt";
import { IuserRepository } from "../../../framework/database/mongodb/repositoryInterface/userRepository";

export const login = async (userRepository: IuserRepository, jwt: Ijwt,  hashPassword: Ihashpassword, email: string, password: string, next: Next): Promise<object | void> => {
  try {
    const user = await userRepository.findbyEmail(email)

    if (!user) return next(new ErrorHandler(400, "invalid email id"))
    
    const result = await hashPassword.comparePassword(password, user?.password)
    if (!result) return next(new ErrorHandler(400, "invalid password"))
    
    
    const tokens = await jwt.createAccessAndRefreshToken(user?._id as string)

    return { user, tokens }
  } catch (error) {
    throw error
  }


}