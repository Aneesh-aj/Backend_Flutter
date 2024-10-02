import { Iuser } from "../../../entities/user"
import { Next } from "../../../framework/types/serverPackageTypes"
import { IotpRepository } from "../../../framework/database/mongodb/repositoryInterface/otpRepository"
import { Ihashpassword } from "../../interface/service/hashPassword"
import { Ijwt } from "../../interface/service/jwt"
import { catchError } from "../../middleares/catchError"
import ErrorHandler from "../../middleares/errorHandler"
import { IuserRepository } from "../../../framework/database/mongodb/repositoryInterface/userRepository"



export const createUser= async (token:string,otp:string,otpRepository:IotpRepository,userRepository:IuserRepository,hashPassword:Ihashpassword,jwt:Ijwt,next : Next):Promise <Iuser | void>=>{  
     
    try{
        const decode = await jwt.verifyJwt(token) as Iuser
        if(!decode){
            return next(new ErrorHandler(400,"token has expired,register again"))
        }
         
        const result = await otpRepository.findOtp(decode.email)
        if(!result){
            return next(new ErrorHandler(400,"otp expired"))
        }
        if(result.otp !== otp){
           return next(new ErrorHandler(400,"invalid otp"))
        }
         
        const newUser = await userRepository.createUser(decode)
        return newUser
    
    
    }catch(error){
        throw error
    }
      
}