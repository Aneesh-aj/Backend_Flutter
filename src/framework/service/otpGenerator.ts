import { IotpGenerate } from "../../usecases/interface/service/otpGenerate";

export class OtpGenerate implements IotpGenerate{
    
   async  createOtp(): Promise<string > {
    
    const numericChars = "0123456789"
    let otp = ""
    for(let i = 0 ;i<4 ;i++){
      const randomIndex = Math.floor(Math.random() * numericChars.length);
      otp += numericChars[randomIndex]
    }
    return otp
     }
}