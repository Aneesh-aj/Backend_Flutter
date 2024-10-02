import { Iproduct } from "../../../entities/product"
import { IproductRepository } from "../../../framework/database/mongodb/repositoryInterface/productRepository"

export const getAllProducts = async (productRepository:IproductRepository):Promise<Iproduct[] | {message:string} | void>=>{
    try{
          return await productRepository.getAllProducts()
    }catch(error){
         throw error
    }
}