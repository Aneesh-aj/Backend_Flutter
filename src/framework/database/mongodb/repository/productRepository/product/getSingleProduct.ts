import { Iproduct } from "../../../../../../entities/product"
import productModel from "../../../model/product"

export const getOneProduct = async (productId: string): Promise<Iproduct | { message: string,status:boolean }> => {
    try {
        //Checking ProductId is provided

        if (!productId) return { message: "provide productId" ,status:false}

        //Fetching product by Id
        const product = await productModel.findById(Object(productId))

        if (!product) return { message: "No product avalible",status:false }
        return product

    } catch (error:any) {
        throw new Error("Error getting products: " + error.message);
    }
}