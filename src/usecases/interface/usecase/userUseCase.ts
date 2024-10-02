import { Iuser } from "../../../entities/user"
import { Next } from "../../../framework/types/serverPackageTypes"
import { IToken } from "../service/jwt"

export interface IuserUseCase{
    userSignup( user: Iuser,next : Next) : Promise < string | void >
    login(email:string,password:string,next:Next) : Promise < {user:Iuser, tokens:IToken} | void> 
    createUser(email:string , otp:string, next: Next) : Promise <Iuser| void>
    getProfile(userId:string,next:Next):Promise<Iuser | void>
}