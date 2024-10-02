import { Req, Res, Next } from "../../framework/types/serverPackageTypes";

import { Iuser } from "../../entities/user";
import { userSignup, login, createUser, getProfile} from "./user/index"
import { Ijwt } from "../interface/service/jwt";
import { NextFunction } from "express";
import { IotpGenerate } from "../interface/service/otpGenerate";
import { Ihashpassword } from "../interface/service/hashPassword";
import { IsentEmail } from "../interface/service/sentEmail";
import { catchError } from "../middleares/catchError";
import { resentOpt } from "./otp/otp";

import { sentOtp } from "./user/sentOtp";
import { IotpRepository } from "../../framework/database/mongodb/repositoryInterface/otpRepository";
import { IuserRepository } from "../../framework/database/mongodb/repositoryInterface/userRepository";
import { IuserUseCase } from "../interface/usecase/userUseCase";



export class UserUseCase implements IuserUseCase{

     constructor(
          private userRepository: IuserRepository,
          private jwt: Ijwt,
          private otpGenerate: IotpGenerate,
          private otpRepository: IotpRepository,
          private sentEmail: IsentEmail,
          private hashPassword: Ihashpassword,
         
     ) { }
     async userSignup(user: Iuser, next: Next): Promise<string | void> {
          try {
               const token = await userSignup(
                    this.jwt,
                    this.otpRepository,
                    this.userRepository,
                    this.otpGenerate,
                    this.hashPassword,
                    user,
                    this.sentEmail,
                    next)
               return token
          } catch (error: unknown) {
               console.log(" in here")
               catchError(error, next)
          }
     }
     async login(email: string, password: string, next: NextFunction): Promise<any | void> {
          try {
               console.log(" in the use case------------", password)
               return await login(this.userRepository,
                    this.jwt,
                    this.hashPassword,
                    email,
                    password,
                    next
               )
          } catch (error: unknown) {
               catchError(error, next)
          }
     }

     async createUser(token: string, otp: string, next: NextFunction): Promise<Iuser | void> {
          try {
               const user = await createUser(
                    token,
                    otp,
                    this.otpRepository,
                    this.userRepository,
                    this.hashPassword,
                    this.jwt,
                    next)
               console.log("in the usecase", user)
               return user
          } catch (error) {
               catchError(error, next)
          }
     }

     async getProfile(userId: string,next:Next): Promise<Iuser | void> {
         try{
              return await getProfile(userId,this.userRepository,next)
              
         }catch(error:any){
             catchError(error,next)
         }
     }
}

