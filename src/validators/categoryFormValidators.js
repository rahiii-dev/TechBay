const {body} = require('express-validator');

const multer = require("multer");
const multerConfig = require("../config/multerConfig");

const Category = require('../model/categoryModel');

const upload = multer({
  storage: multerConfig.categoryStorage,
  limits: 1024 * 1024 * 5,
});

module.exports = {
    addOrEditFormValidator : [
        upload.single('image'),

        body('name')
            .notEmpty().withMessage('Category name is required')
            .trim()
            .escape(),
        
        body('description').trim(),
    ],

    addFormValidator : [
        body('name')
            .custom( async(value) => {
                if(value){
                    const category = await Category.find({ name: { $regex: value, $options : 'i' } });
                    if (category.length > 0) {
                        return Promise.reject('Category already exists');
                    }
                }
                return true; 
        }),
        body('image')
            .custom((value, {req}) => {
                if(!req.file){
                    return false
                }
                return true
            }).withMessage('Image file is required'),
    ],

    editFormValidator : [
        body('name')
            .custom( async(value, {req}) => {
                const id = req.params.category_id;
                if(value){
                    const category = await Category.find({ 
                        _id : { $ne : id},
                        name: { $regex: value, $options : 'i' } 
                    });
                    if (category.length > 0) {
                        return Promise.reject('Category already exists');
                    }
                }
                return true; 
        })
    ]
}