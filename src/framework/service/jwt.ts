import { Iuser } from "../../entities/user";
import { Ijwt,IToken } from "../../usecases/interface/service/jwt";
import jwt, { JwtPayload } from 'jsonwebtoken'
require('dotenv').config()

export class JWTtoken implements Ijwt{
  JWT_VERIFICATION_KEY= process.env.JWT_VERIFICATION_KEY || "hh"
  JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "hh"
  JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "hh"
     

      async createVerificationJWT(payload: any): Promise<string> {
          const verifyToken = await jwt.sign(payload, this.JWT_VERIFICATION_KEY,{
             expiresIn:'15m',
          })
          console.log("in side the servie",verifyToken )
          return verifyToken
      }

      async createAccessAndRefreshToken(id: string ): Promise<IToken> {
          const payload = {id}
           const accessToken = await jwt.sign(payload , this.JWT_ACCESS_KEY,{
              expiresIn:'5h'
           })

           const refreshToken = await jwt.sign(payload,this.JWT_REFRESH_KEY,{
             expiresIn:'3d',
           })

           return {accessToken,refreshToken,role:""}
      }

      async  verifyJwt(token: string):Promise<Iuser>{
         try{
          const data = await (jwt.verify(token, this.JWT_VERIFICATION_KEY)) as Iuser
        return data
         }catch(error){
             throw error
         }
      }

      
}