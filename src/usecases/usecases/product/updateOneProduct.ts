import { Iproduct } from "../../../entities/product"
import { IproductRepository } from "../../../framework/database/mongodb/repositoryInterface/productRepository"
import { io } from "../../../framework/service/socketIo"

export const updateOneProduct = async (updateData:Iproduct,productId:string,productRepository:IproductRepository):Promise<{message:string ,status:boolean} | void>=>{
    try{ 
        const product = await productRepository.findById(productId)

        // if there is no product it will return 

        if(!product.status) return product

        //Send a notification to the frontend that product is updated

        io.emit("productUpdate",product)
        
        //  it will return update the product status and message
         return await productRepository.updateOneProduct(updateData,productId)
    }catch(error){
         throw error
    }
}