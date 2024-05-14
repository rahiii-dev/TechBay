const { log } = require('node:console');
const Category = require('../../model/categoryModel');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    /*  
        Route: GET category/list
        Purpose: Render the category list page
    */
    renderCategoryListPage : async (req, res, next) => {
        try {
            const categories = await Category.find();
            return res.render('admin/category/categoryList', {title : "Tech Bay | Admin | Category Management", categories});
        } catch (error) {
            console.log("Error while Rendering Category list");
            next(error);
        }
    },
    /*  
        Route: GET category/add
        Purpose: Render the category add page
    */
    renderCategoryAddPage : (req, res) => {
        const errorObj = req.flash('errorObj')[0];
        return res.render('admin/category/categoryAdd', {title : "Tech Bay | Admin | Category Management", errorObj});
    },
    /*  
        Route: POST category/add
        Purpose: create a category
    */
    createCategory : async (req, res, next) => {
        try {
            const {name, description} = req.body;

            const image = req.file?.path;
            console.log("File: ", req.file);
            console.log("body : ", req.body);
            const newCategory = new Category({name, description, image})
            await newCategory.save()
            return res.redirect('/admin/category/list')
        } catch (error) {
            console.log("Error while creating Category");
            next(error);
        }
    },
    /*  
        Route: GET category/edit/category_id
        Purpose: render category edit page
    */
    renderUpdateCategorPage : async (req, res, next) => {
        try {
            const errorObj = req.flash('errorObj')[0];
            const id = req.params.category_id;
            const category = await Category.findById(id);
            if(category){
                const imageName = path.basename(category.image);
                return res.render('admin/category/categoryEdit', {title : "Tech Bay | Admin | Category Management", category, imageName, errorObj});
            }

            return res.redirect('/404')
        } catch (error) {
            console.log("Error while rendering category update page");
            next(error);
        }
    },
    /*  
        Route: PUT category/edit/category_id
        Purpose: Update category 
    */
    updateCategory : async (req, res, next) => {
        try {
            const id = req.params.category_id;
            const {name, description, existingImage} = req.body;
            let image = existingImage;
            if(req.file){
                image = req.file?.path;
            }
            const category = await Category.findByIdAndUpdate(id, {name, description, image});
            if(category){
                return res.redirect('/admin/category/list')
            }
            return res.redirect('/404')
        } catch (error) {
            console.log("Error while Updating Category");
            next(error);
        }
    },
    /*  
        Route: PATCH category/softdelete/:category_id
        Purpose: Soft Delete Category
    */
    softDeleteCategory : async (req, res, next) => {
        try {
            const id = req.params.category_id;
            const category = await Category.findByIdAndUpdate(id, {
                isActive : false
            });
            
            if(category){
                return res.redirect('/admin/category/list')
            }
            return res.redirect('/404');
        } catch (error) {
            console.log("Error while deleting Category");
            next(error);
        }
    },
    /*  
        Route: PATCH category/restore/:category_id
        Purpose: restore deleted Category
    */
    restoreCategory : async (req, res, next) => {
        try {
            const id = req.params.category_id;
            const category = await Category.findByIdAndUpdate(id, {
                isActive : true
            });
            
            if(category){
                return res.redirect('/admin/category/list')
            }
            return res.redirect('/404');
        } catch (error) {
            console.log("Error while deleting Category");
            next(error);
        }
    },
}