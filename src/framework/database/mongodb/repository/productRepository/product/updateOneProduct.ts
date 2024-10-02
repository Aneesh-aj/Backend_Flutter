import { Iproduct } from "../../../../../../entities/product";
import productModel from "../../../model/product";
import mongoose from "mongoose"; // Import mongoose to use ObjectId

export const updateOneProduct = async (updateData: Iproduct, productId: string): Promise<{ message: string; status: boolean }> => {
    try {
        // Check if productId is provided
        if (!productId) return { message: "Provide productId", status: false };


        const objectId = new mongoose.Types.ObjectId(productId);

        // Update the product in the database
        await productModel.updateOne({ _id: objectId }, updateData);

        return { message: "Product updated", status: true };

    } catch (error: any) {
        throw new Error("Error updating product: " + error.message);
    }
};
