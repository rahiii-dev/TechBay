const Category = require('../model/categoryModel');
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
            // console.log(categories)
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
        return res.render('admin/category/categoryAdd', {title : "Tech Bay | Admin | Category Management"});
    },
    /*  
        Route: POST category/add
        Purpose: create a category
    */
    createCategory : async (req, res, next) => {
        try {
            const {name, description} = req.body;
            const isActive = Boolean(req.body?.isActive);
            const image = req.file?.path;
            const newCategory = new Category({name, description, isActive, image})
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
            const id = req.params.category_id;
            const category = await Category.findById(id);
            if(category){
                const imageName = path.basename(category.image);
                return res.render('admin/category/categoryEdit', {title : "Tech Bay | Admin | Category Management", category, imageName});
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
            const isActive = Boolean(req.body?.isActive);
            let image = existingImage;
            if(req.file){
                image = req.file?.path;
            }
            const category = await Category.findByIdAndUpdate(id, {name, description, isActive, image});
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
        Route: DELETE category/delete/category_id
        Purpose: delete a category 
    */
    deleteCategory : async (req, res, next) => {
        try {
            const id = req.params.category_id;
            const category = await Category.findByIdAndDelete(id)
            if(category){
                return res.redirect('/admin/category/list')
            }
            return res.redirect('/404')
        } catch (error) {
            console.log("Error while creating Category");
            next(error);
        }
    },
    /*  
        Route: PATCH category//change_status/:category_id?status=?
        Purpose: change category status to active or inactive
    */
    changeCategoryStatus : async (req, res, next) => {
        try {
            const id = req.params.category_id;
            const status = (req.query?.status == 'true') ? true : false ;
            const category = await Category.findByIdAndUpdate(id, {
                isActive : status
            });
            
            if(category){
                return res.redirect('/admin/category/list')
            }
            return res.redirect('/404');
        } catch (error) {
            console.log("Error while Inactivating Category");
            next(error);
        }
    },
}