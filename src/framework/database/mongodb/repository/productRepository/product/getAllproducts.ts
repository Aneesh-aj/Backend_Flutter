import { Iproduct } from "../../../../../../entities/product"
import productModel from "../../../model/product"

export const getAllProducts = async (): Promise<Iproduct[] | { message: string }> => {
    try {

        const allProducts = await productModel.find()

        //checking is there are product

        if (allProducts.length==0) return { message: "No product avalible" }

        return allProducts

    } catch (error:any) {
        throw new Error("Error getting products: " + error.message);
    }
}