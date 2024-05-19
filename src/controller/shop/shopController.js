const Category = require("../../model/categoryModel");
const Product = require("../../model/productModel");

module.exports = {
    /*  
        Route: GET /
        Purpose: Render the homepage
    */
    renderHomePage : (req, res) => {
        // const isAuthenticated = req.isAuthenticated() || req.session.isAuthenticated;
        res.render('user/home', {title : "Tech Bay | Home"});
    },
    /*  
        Route: GET /shop
        Purpose: Render the shop products
    */
    renderShopPage : async (req, res, next) => {
        
        try {
            const page = parseInt(req.query.page) || 1;  
            const limit = parseInt(req.query.limit) || 12;
            const skip = (page - 1) * limit;
            const sortby = req.query.sortby || 'newest';

            let sortCriteria;
            switch (sortby) {
                case 'latest':
                    sortCriteria = { createdAt: -1 };
                    break;
                case 'rating':
                    sortCriteria = { rating: -1 };
                    break;
                case 'lowest':
                    sortCriteria = { price: 1 };
                    break;
                case 'highest':
                    sortCriteria = { price: -1 };
                    break;
                default:
                    sortCriteria = { createdAt: -1 };
            }

            const categories = await Category.find({isActive: true}).select('name')
            const products = await Product.find({isActive : true})
            .populate({
                path : 'category',
                match : {isActive : true},
                select : '-_id name isActive'

            })
            .sort(sortCriteria)
            .skip(skip)
            .limit(limit)
            .select('product_name price images isActive description')

            console.log(products);
            res.render('user/shop', {title : "Tech Bay | Shop", products, categories, sortby, limit});
        } catch (error) {
            console.log("Error While rendering shop page");
            next(error)
        }
    },
}