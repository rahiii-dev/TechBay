const {body, validationResult} = require('express-validator');

module.exports = {
    loginFormValidator : [
        body('email')
            .notEmpty().withMessage('Please provide an email'),
        body('password')
            .notEmpty().withMessage('Please provide a password')
    ],
    registerFormValidator : [
        body('email')
            .notEmpty().withMessage('Please provide an email')
            .isEmail().withMessage('Invalid email address'),
        body('phone')
            .notEmpty().withMessage('Mobile number is required')
            .isNumeric().withMessage('Mobile number must be numeric')
            .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
        body('password')
            .notEmpty().withMessage('Please provide an password'),
            // .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            // .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
            // .withMessage('Password must contain at least one number and one special character'),
        body('Cpassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    return false;
                }
                return true;
            })
            .withMessage('Passwords do not match'),
    ],

    createObjectofError : (errors) => {
        const errorObj = {};

        errors.array().forEach(error => {
            if (!errorObj[error.path]) {
                errorObj[error.path + 'Error'] = error.msg;
                errorObj[error.path] = error.value;
            }
        });

        return errorObj;
    },

    handleFormValidation : function(renderPagePath, renderPageTiltle = 'Tech Bay') {
        return (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const errorObj = this.createObjectofError(errors);
                for(let key in req.body){
                    if(!errorObj[key] && req.body[key]){
                        errorObj[key] = req.body[key];
                    }
                }
                return res.render(renderPagePath, {title : renderPageTiltle, errorObj});
            }

            next();
        }
    }
}