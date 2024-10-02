import { Iproduct } from "../../../../../../entities/product";
import productModel from "../../../model/product";
import mongoose from "mongoose"; // Import mongoose to use ObjectId

export const findById = async (productId: string): Promise<{ message: string; status: boolean }> => {
    try {
        // Checking if productId is provided
        if (!productId) return { message: "Provide productId", status: false };

       

        const objectId = new mongoose.Types.ObjectId(productId);

        const product = await productModel.findById(objectId);
        console.log(" the product",product)

        if (!product) return { message: "No product available", status: false };

        // Return if product is available
        return { message: "Product exists", status: true };

    } catch (error: any) {
        throw new Error("Error getting product: " + error.message);
    }
};
