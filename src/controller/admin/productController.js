const Category = require('../../model/categoryModel');
const Product = require('../../model/productModel')
const fs = require('node:fs')

module.exports = {
    /*  
        Route: GET admin/product/list
        Purpose: Render the products for admin
    */
        renderProductListPage : async (req, res, next) => {
            try {
                const products = await Product.find().populate({
                    path : 'category',
                    model : Category,
                    select: 'name -_id'
                }).select('-description -related_products -discount');
                return res.render('admin/product/productList', {title : "Tech Bay | Admin | Product Management", products});
            } catch (error) {
                console.log("Error while rendering product list page");
                next(error)
            }
    },
    /*  
        Route: GET admin/product/product_id
        Purpose: Render the product detail for admin
    */
        renderProductViewPage : async (req, res, next) => {
            try {
                const product = await Product.findById(req.params.product_id).populate({
                    path : 'category',
                    model : Category,
                    select: 'name -_id'
                });
                return res.render('admin/product/productView', {title : "Tech Bay | Admin | Product Management", product});
            } catch (error) {
                console.log("Error while rendering product view page");
                next(error)
            }
    },
    /*  
        Route: GET admin/product/add
        Purpose: Render the products add page for admin
    */
        renderProductAddPage : async(req, res, next) => {
            try {
                const errorObj = req.flash('errorObj')[0];
                const categories =  await Category.find({isActive : {$eq : true}}, {name : 1});
                return res.render('admin/product/productAdd', {title : "Tech Bay | Admin | Product Management", categories, errorObj});
            } catch (error) {
                console.log("Error while rendering product add page");
                next(error)
            }
    },
    /*  
        Route: POST admin/product/add
        Purpose: create new Product
    */
        createProduct : async(req, res, next) => {
            try {
                const {product_name, category, unit, quantity, price, discount, description} = req.body;
                const images = req.files.map((file) => file.path);
                req.body['images'] = images;
                const newProduct = new Product({product_name, category, unit, quantity, discount, price, images, description});
                await newProduct.save();
                return res.redirect('/admin/product/list')
            } catch (error) {
                console.log("Error while creating product");
                next(error)
            }
    },
    /*  
        Route: GET admin/product/edit/:product_id
        Purpose: Render the products edit page
    */
        renderProductEditPage : async (req, res, next) => {
            try {
                const errorObj = req.flash('errorObj')[0];
                const product = await Product.findById(req.params.product_id).populate({
                    path : 'category',
                    model : Category,
                    select: 'name'
                });
                const categories =  await Category.find({isActive : {$eq : true}}, {name : 1});
                return res.render('admin/product/productEdit', {title : "Tech Bay | Admin | Product Management", product, categories, errorObj});
            } catch (error) {
                console.log("Error while rendering product edit page");
                next(error)
            }
    },
    /*  
        Route: PUT admin/product/edit/:product_id
        Purpose: update a Product
    */
        updateProduct : async(req, res, next) => {
            try {
                const {product_name, category, unit, quantity, discount, price, description, existing_images} = req.body;
                let images = existing_images.split(',');

                if(req.files.length > 0){
                    images = req.files.map((file) => file.path);
                }

                await Product.findByIdAndUpdate(req.params.product_id, { product_name, category, unit, quantity, discount, price, description, images });
                return res.redirect('/admin/product/list')
            } catch (error) {
                console.log("Error while updating product");
                next(error)
            }
    },
    /*  
        Route: PATCH admin/product/softdelete/:product_id
        Purpose: Soft delete a product
    */
        softDeleteProduct : async (req, res, next) => {
            try {
                await Product.findByIdAndUpdate(req.params.product_id, { isActive : false});
                return res.redirect('/admin/product/list');
            } catch (error) {
                console.log("Error while soft deleting product");
                next(error)
            }
    },
    /*  
        Route: PATCH admin/product/restore/:product_id
        Purpose: restore deleted a product
    */
        restoreProduct : async (req, res, next) => {
            try {
                await Product.findByIdAndUpdate(req.params.product_id, { isActive : true});
                return res.redirect('/admin/product/list');
            } catch (error) {
                console.log("Error while soft deleting product");
                next(error)
            }
    },
}