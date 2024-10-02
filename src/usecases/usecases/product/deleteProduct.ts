import { IproductRepository } from "../../../framework/database/mongodb/repositoryInterface/productRepository"
import { Next } from "../../../framework/types/serverPackageTypes"
import ErrorHandler from "../../middleares/errorHandler"

export const deleteOneProduct = async (productId:string,productRepository:IproductRepository,next:Next):Promise<{message:string,status:boolean} | void>=>{
    try{
        // checking is the product is availible
        if (!productId) return next(new ErrorHandler(400," Provide ProductId"))


        const product = await productRepository.findById(productId)
        if(!product) return product

        //Deleting the product

       return await productRepository.deleteOneProduct(productId)
       
    }catch(error){
         throw error
    }
}