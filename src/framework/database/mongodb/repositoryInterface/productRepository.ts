import { Iproduct } from "../../../../entities/product"


export interface IproductRepository {
    createProduct(product: Iproduct): Promise<{ message: string, status: boolean } | void>
    getAllProducts(): Promise<Iproduct[] | { message: string }>
    getOneProduct(productId:string): Promise<Iproduct | { message: string,status:boolean } | void>
    updateOneProduct(updateData:Iproduct,productId:string): Promise< {message:string , status:boolean} | void>
    deleteOneProduct(prodcutId:string): Promise< {message:string,status:boolean} >
    findById(productId:string) : Promise<{message:string,status:boolean}>
}