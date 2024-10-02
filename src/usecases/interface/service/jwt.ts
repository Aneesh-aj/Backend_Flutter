import { Iuser } from "../../../entities/user";
import { Req } from "../../../framework/types/serverPackageTypes";
import  Jwt  from "jsonwebtoken";


export interface IToken{
    accessToken:string,
    refreshToken:string,
    role:string
}

export interface Ijwt{
    createVerificationJWT(payload:Iuser): Promise <string>
    createAccessAndRefreshToken(id: string): Promise<IToken>
    verifyJwt(token:string): Promise <Iuser>
}