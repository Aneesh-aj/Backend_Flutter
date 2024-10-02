
import { IproductRepository } from "../../repositoryInterface/productRepository";
import { Iproduct } from "../../../../../entities/product";

import {createProduct, deleteOneProduct, findById, getAllProducts, getOneProduct, updateOneProduct} from "./product/index"

export class ProductRepository implements IproductRepository{

    createProduct(productData: Iproduct): Promise<{ message: string; status: boolean; } | void> {
        return createProduct(productData)
    }

    getAllProducts(): Promise<Iproduct[] | { message: string; }> {
        return getAllProducts()
    }

    getOneProduct(productId:string): Promise<Iproduct | { message: string,status:boolean }> {
        return getOneProduct(productId)
    }

    updateOneProduct(updateData:Iproduct,productId: string): Promise< { message: string , status:boolean} | void> {
        return updateOneProduct(updateData,productId)
    }

    deleteOneProduct(prodcutId: string): Promise<{ message: string; status: boolean; }> {
        return deleteOneProduct(prodcutId)
    }
    
    findById(productId: string): Promise<{ message: string; status: boolean; }> {
        return findById(productId)
    }



}