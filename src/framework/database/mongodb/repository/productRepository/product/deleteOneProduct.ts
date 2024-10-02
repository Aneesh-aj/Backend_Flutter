import productModel from "../../../model/product";
import { Next } from "../../../../../types/serverPackageTypes";

export const deleteOneProduct = async (productId: string): Promise<{ message: string, status: boolean }> => {
    try {
        //checking productId  is provided

        const product = await productModel.findById(productId);

        if (!product) return { message: "No product found", status: false }

        // Delete product

        await productModel.deleteOne({ _id: productId })

        return { message: "Product is deleted", status: true }

    } catch (error:any) {
        throw new Error("Error Deleting products: " + error.message);
    }
}