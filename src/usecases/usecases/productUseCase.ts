import { Iproduct } from "../../entities/product"
import { IproductRepository } from "../../framework/database/mongodb/repositoryInterface/productRepository";
import { Next } from "../../framework/types/serverPackageTypes";
import {IproductUsecase} from "../interface/usecase/productUseCase"
import { catchError } from "../middleares/catchError";
import {createProduct, deleteOneProduct, getAllProducts, getOneProduct, updateOneProduct} from "./product/index"
export class ProductUsecase implements IproductUsecase {

    constructor(
        private productRepository:IproductRepository
    ){}

   async createProduct(product: Iproduct,next:Next): Promise<{ message: string; status: boolean; } | void> {
        try{
            return await createProduct(product,this.productRepository)
        }catch(error){
            catchError(error, next)
        }
    }

   async updateOneProduct(updateData: Iproduct, productId: string,next:Next): Promise< { message: string , status:boolean} | void> {
        try{
             return await updateOneProduct(updateData,productId,this.productRepository)
        }catch(error){
            catchError(error, next)

        }
    }

  async  deleteOneProduct(prodcutId: string,next:Next): Promise<{ message: string; status: boolean } | void> {
        try{
            return await deleteOneProduct(prodcutId,this.productRepository,next)
        }catch(error){
            catchError(error, next)
        }
    }

  async  getOneProduct(productId: string,next:Next): Promise<Iproduct | { message: string,status:boolean} | void> {
        try{
            return await getOneProduct(productId,this.productRepository)
        }catch(error){
            catchError(error, next)
        }
    }

   async getAllProducts(next:Next): Promise<Iproduct[] | { message: string  } | void> {
        try{
            return await getAllProducts(this.productRepository)
        }catch(error){
            catchError(error, next)
        }
    }
}

