import { body, param, query, validationResult } from 'express-validator';
export const productValidationRules = {

    createProduct: [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    ],
    deleteProduct: [
        param('productId').notEmpty().withMessage('Product ID is required').isMongoId().withMessage('Invalid Product ID format'),
    ],
    updateProduct: [
        param('productId').notEmpty().withMessage('Product ID is required').isMongoId().withMessage('Invalid Product ID format'),
        body('name').optional().notEmpty().withMessage('Name must not be empty'),
        body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    ],
    getOneProduct: [
        param('productId').notEmpty().withMessage('Product ID is required').isMongoId().withMessage('Invalid Product ID format'),
    ],
   
};


