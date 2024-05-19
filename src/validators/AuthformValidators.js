const {body} = require('express-validator');
const User = require('../model/userModel');

module.exports = {
    loginFormValidator : [
        body('email')
            .trim()
            .notEmpty().withMessage('Please provide an email'),
        body('password')
            .trim()
            .notEmpty().withMessage('Please provide a password')
    ],
    
    registerFormValidator : [
        body('email')
            .trim()
            .notEmpty().withMessage('Please provide an email')
            .isEmail().withMessage('Invalid email address')
            .custom( async (value) => {
                const user = await User.findOne({email : value});
                if(user){
                    return Promise.reject("Email already exist. Please try loging in.")
                }
                return true;
            }),
        body('phone')
            .trim()
            .notEmpty().withMessage('Mobile number is required')
            .isNumeric().withMessage('Mobile number must be numeric')
            .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
        body('password')
            .trim()
            .notEmpty().withMessage('Please provide a password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
            .withMessage('Password must contain at least one number and one special character'),
        body('Cpassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    return false;
                }
                return true;
            })
            .withMessage('Passwords do not match'),
    ],
}