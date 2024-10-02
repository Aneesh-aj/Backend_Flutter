import mongoose from "mongoose";
import userModel from "../../../model/userModel";
import { Iuser } from "../../../../../../entities/user";

export const getProfile = async (userModels: typeof userModel, userId: string): Promise<Iuser | void> => {
    try {
        // Convert the passed userId string to an ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        const user = await userModels.findById(objectId);

        if (!user) {
            return;
        }

        return user as Iuser;
        
    } catch (error) {
        throw error;
    }
};
