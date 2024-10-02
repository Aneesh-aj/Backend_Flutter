import { Iproduct } from "../../../entities/product";
import { Next } from "../../../framework/types/serverPackageTypes";


export interface IproductUsecase{
    createProduct(product: Iproduct,next:Next): Promise<{ message: string, status: boolean } | void>
    getAllProducts(next:Next): Promise<Iproduct[] | { message: string } | void>
    getOneProduct(productId:string,next:Next): Promise<Iproduct | { message: string,status:boolean } | void>
    updateOneProduct(updateData:Iproduct,productId:string,next:Next): Promise< {message:string , status:boolean} | void>
    deleteOneProduct(prodcutId:string,next:Next): Promise< {message:string,status:boolean} | void >
}