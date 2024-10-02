import { Iproduct } from "../../../../../../entities/product";
import productModel from "../../../model/product";

export const createProduct = async (productData: Iproduct): Promise<{ message: string, status: boolean } | void> => {
    try {
        //Checking is the productData is provided

        if (!productData) return { message: "Provide updation Details", status: false }

        //creating product

        const product = await productModel.create(productData)

        return { message: "Product created", status: true }

    } catch (error:any) {
        throw new Error("Error creating products: " + error.message);

    }
}