import { body } from 'express-validator';

export const validateSignup = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    body('email')
        .isEmail()
        .withMessage('Must be a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

export const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Must be a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

export const validateOtpVerification = [
    body('otp')
        .isNumeric()
        .withMessage('OTP must be a numeric value')
        .isLength({ min: 4, max: 6 })
        .withMessage('OTP must be between 4 and 6 digits long'),
];
