import { Iproduct } from "../../../entities/product"
import { IproductRepository } from "../../../framework/database/mongodb/repositoryInterface/productRepository"

export const getOneProduct = async (productId:string,productRepository:IproductRepository):Promise<Iproduct | {message:string,status:boolean} | void>=>{
    try{  

        const product = await productRepository.findById(productId)

        // if there is no product it will return 

        if(!product.status) return product
        
          return await productRepository.getOneProduct(productId)
    }catch(error){
         throw error
    }
}