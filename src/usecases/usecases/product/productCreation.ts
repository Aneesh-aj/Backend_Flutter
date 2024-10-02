import { Iproduct } from "../../../entities/product"
import { IproductRepository } from "../../../framework/database/mongodb/repositoryInterface/productRepository"
import { io } from "../../../framework/service/socketIo"

export const createProduct = async (product:Iproduct,productRepository:IproductRepository):Promise<{message:string,status:boolean}|void>=>{
    try{
        
        const products =  await productRepository.createProduct(product)

        // Give realtime notification when the product is created or not created

        io.emit("productCreateNotification",products)
        return products

    }catch(error){
         throw error
    }
}