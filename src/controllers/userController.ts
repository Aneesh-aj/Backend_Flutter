import { Req, Res, Next } from "../framework/types/serverPackageTypes"
import { IuserUseCase } from "../usecases/interface/usecase/userUseCase"
import ErrorHandler from "../usecases/middleares/errorHandler"
import { accessTokenOptions, refreshTokenOptions, roleOptions } from "../framework/webServer/middlewares/Tokens"
import { response } from "express"



export class UserController {

    private userUseCase: IuserUseCase

    constructor(userUseCase: IuserUseCase,) { this.userUseCase = userUseCase }
    
    //signup function for user
    async signup(req: Req, res: Res, next: Next) {
        try {
            const Token = await this.userUseCase.userSignup({ name: req.body.name, email: req.body.email, password: req.body.password,blocked:false }, next)
            if(Token){
                //adding verification Token to cookie for signup
                res.cookie("verificationToken",Token,{
                    httpOnly:true,
                    sameSite:"none",
                    expires:new Date(Date.now()+ 300 * 60 * 1000),
                })
                    res.status(200).json({
                     success:true,
                     message:"verification otp has been sent to the mail",
                     verifyToken:Token
                })
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }

    }

    // function for otp verification and userCreation

    async otpVerificationAndUserCreation(req: Req, res: Res, next: Next) {
        try{
            const token = req.cookies("verificationToken")
            const user = await this.userUseCase.createUser(token as string,req.body.otp, next)
            if(user){
                res.clearCookie("verificationToken").status(200).send(user)
            }
        }catch(error:any){
            return next(new ErrorHandler(error.status , error.message))
        }
    }

    //function for userLogin
    async userLogin(req: Req, res: Res, next: Next) {
        try {
           
    
            const result = await this.userUseCase.login(req.body.email, req.body.password, next);
    
            if (result) {
                res.cookie("accessToken", result.tokens.accessToken, accessTokenOptions);
                res.cookie("refreshToken", result.tokens.refreshToken, refreshTokenOptions);
                res.status(200).json({
                    user: result.user,
                    message: "User logged in successfully",
                    role: 'user',
                    accessToken: result.tokens.accessToken,
                    refreshToken: result.tokens.refreshToken,
                });
            }
        } catch (error: any) {
            return next(new ErrorHandler(error, next));
        }
    }

    async logout(req:Req, res: Res,next : Next){
        try{
            console.log("logingn out")
            res.clearCookie('accessToken',accessTokenOptions)
            res.clearCookie('refreshToken',refreshTokenOptions)
            res.status(200).json({sucess:true ,message:"logout successful"})
        }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
        }
    }
    // Get user infomation
    async getProfile(req:Req,res:Res,next:Next){
        try{
             const {userId} = req.params

            const profileDetails = await this.userUseCase.getProfile(userId,next)

            if(profileDetails) return res.status(200).json({message:"profilel Details fetched",details:profileDetails})

        }catch(error:any){
             return next(new ErrorHandler(error.status,error.message))
        }
    }
 
}