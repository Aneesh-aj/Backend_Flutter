import { Iproduct } from "../entities/product";
import { Next, Req, Res } from "../framework/types/serverPackageTypes";
import { IproductUsecase } from "../usecases/interface/usecase/productUseCase";
import ErrorHandler from "../usecases/middleares/errorHandler";


export class ProductController {

    private productUseCase: IproductUsecase
    constructor(productUseCase: IproductUsecase) { this.productUseCase = productUseCase }

    async getAllProduct(req: Req, res: Res, next: Next) {
        try {
            const products = await this.productUseCase.getAllProducts(next)
            console.log("  the product",products)
            //Checking the products
            if (Array.isArray(products)) {
                return res.status(200).json({
                    success: true,
                    products, // Returns the array of products
                });
            }
            //Returning message if products are unavalible

            if (products && typeof products === 'object' && 'message' in products) {
                return res.status(404).json({
                    success: false,
                    message: products.message, // Returns the message from the use case
                });
            }
        } catch (error: any) {
            return next(new ErrorHandler(error, next))
        }
    }

    async getOneProduct(req: Req, res: Res, next: Next) {
        try {
            const { productId } = req.params

            const product = await this.productUseCase.getOneProduct(productId,next)


            // Check if the response is an instance of the Iproduct object
            if (product && typeof product === 'object' && 'name' in product && 'price' in product) {
                return res.status(200).json({
                    success: true,
                    product, // Returns th  e product object
                });
            }

            // Check if the response is an object with a message
            if (product && typeof product === 'object' && 'message' in product) {
                return res.status(404).json({
                    success: false,
                    message: product.message, // Returns the message from the use case
                    status: product.status // Optional status if needed
                });
            }


        } catch (error: any) {
            return next(new ErrorHandler(error, next))
        }
    }

    async createProduct(req: Req, res: Res, next: Next) {
        try {
            const { name, price } = req.body;

            // Call the use case to create the product
            const createdProduct = await this.productUseCase.createProduct({ name, price } as Iproduct,next);

            // Check if the creation was successful and return the created product response
            if (createdProduct?.status) {
                return res.status(201).json({
                    message: createdProduct.message, // Success message
                    status: createdProduct.status,
                });
            }

            // Return error response if the creation failed
            return res.status(400).json({
                message: createdProduct?.message || "Product creation failed", // Default message if none provided
                status: createdProduct?.status,
            });

        } catch (error: any) {
            return next(new ErrorHandler(error, next)); // Pass the error to the error handler
        }
    }


    async updateProduct(req: Req, res: Res, next: Next) {
        try {
            const { productId } = req.params
            const { name, price } = req.body

            const updated = await this.productUseCase.updateOneProduct({ name, price } as Iproduct, productId,next)
            // Check if the update was successful and return the response

            if (updated?.status) {
                return res.status(200).json({
                    message: updated.message, // Success message
                    status: updated.status,
                });
            }

            // Return error response if the creation failed
            return res.status(400).json({
                message: updated?.message || "Product creation failed", // Default message if none provided
                status: updated?.status,
            });


        } catch (error: any) {
            return next(new ErrorHandler(error, next))
        }
    }


    async deleteOneProduct(req: Req, res: Res, next: Next) {
        try {
            const { productId } = req.params;
            const deleted = await this.productUseCase.deleteOneProduct(productId,next);
    
            // Check if the deletion was successful
            if (deleted?.status) {
                return res.status(200).json({
                    message: deleted.message, // Success message
                    status: deleted.status,
                });
            }
    
            // If deletion was not successful, return an error response
            return res.status(404).json({ // 404 Not Found if the product doesn't exist
                message: deleted?.message || "Product not found or deletion failed", // Default message if none provided
                status: deleted?.status,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error, next)); 
        }
    }
    

}