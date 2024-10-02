import { Route, Req, Res, Next } from "../../types/serverPackageTypes"
import { isAuthenticate } from "../middlewares/auth"
import { productController } from "./injections/Injection"
import { productValidationRules } from "../middlewares/productInputValidation"
import { validationResult } from "express-validator";


export function ProductRoute(router: Route) {
    
    // Create product route with validation

    router.post('/createProduct', productValidationRules.createProduct, (req: Req, res: Res, next: Next) => {
        console.log(" the body",req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success:false, errors: errors.array()});
        }
        productController.createProduct(req, res, next);
    });

    // Delete product route with validation

    router.delete('/delete/:productId', productValidationRules.deleteProduct, (req: Req, res: Res, next: Next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success:false , errors: errors.array() });
        }
        productController.deleteOneProduct(req, res, next);
    });

    // Update product route with validation
    router.put('/update/:productId', productValidationRules.updateProduct, (req: Req, res: Res, next: Next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success:false , errors: errors.array() });
        }
        productController.updateProduct(req, res, next);
    });

    // Get one product route with validation

    router.get("/getOneProduct/:productId", productValidationRules.getOneProduct, (req: Req, res: Res, next: Next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success:false , errors: errors.array() });
        }
        productController.getOneProduct(req, res, next);
    });

    // Get all products route with validation

    router.get("/getAllProduct", (req: Req, res: Res, next: Next) => {
       
        productController.getAllProduct(req, res, next);
    });

    return router;
}