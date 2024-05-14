const {body} = require('express-validator');

module.exports = {
    addAndEditFormValidator : [
        body('product_name')
            .notEmpty().withMessage('Product name is required')
            .trim()
            .escape(),
        body('category')
            .notEmpty().withMessage('Category is required'),
        body('unit')
            .notEmpty().withMessage('Unit is required'),
        body('quantity')
            .notEmpty().withMessage('Quantity is required')
            .isNumeric().withMessage('Quantity must be a number')
            .trim()
            .toInt()
            .custom((value) => {
                if(value < 0){
                    return false;
                }

                return true;
            }).withMessage('Category be greater than 0'),
        body('price')
            .notEmpty().withMessage('Price is required')
            .trim()
            .isNumeric().withMessage('Price must be a number')
            .toFloat()
            .custom((value) => {
                if(value < 0){
                    return false;
                }

                return true;
            }).withMessage('Price be greater than 0'),    
        ],
        // edit form
        addFormValidator : [
            body('images')
            .custom((value, {req}) => {
                if(req.files.length < 3){
                    return false
                }

                return true;
            }).withMessage('Minimum 3 image file is required'),
        ]
}