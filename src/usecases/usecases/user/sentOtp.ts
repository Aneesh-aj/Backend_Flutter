import { IotpRepository } from "../../../framework/database/mongodb/repositoryInterface/otpRepository";
import { IuserRepository } from "../../../framework/database/mongodb/repositoryInterface/userRepository";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { IsentEmail } from "../../interface/service/sentEmail";


export const sentOtp = async (email: string, name: string, otpGenerate: IotpGenerate, otpRepository: IotpRepository, sentEmail: IsentEmail, userRepoistory: IuserRepository): Promise<{ success: boolean, message: string } | undefined> => {
    try {

        const user = await userRepoistory.findbyEmail(email)
        if (!user) return { success: false, message: "No user found" }
        const otp = await otpGenerate.createOtp()
        await otpRepository.createOtp(email, otp)

        await sentEmail.sentEmailVerification(name, email, otp)
        return { success: true, message: "Otp sented to your email" }


    } catch (error) {
        throw error
    }
}