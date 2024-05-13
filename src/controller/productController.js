module.exports = {
    /*  
        Route: GET admin/product/list
        Purpose: Render the products for admin
    */
        renderProductListPage : (req, res) => {
            return res.render('admin/product/productList', {title : "Tech Bay | Admin | Product Management"});
    },
    /*  
        Route: GET admin/product/product_id
        Purpose: Render the product detail for admin
    */
        renderProductViewPage : (req, res) => {
            console.log("Product View Page")
            return res.render('admin/product/productView', {title : "Tech Bay | Admin | Product Management"});
    },
    /*  
        Route: GET admin/product/add
        Purpose: Render the products add page for admin
    */
        renderProductAddPage : (req, res) => {
            return res.render('admin/product/productAdd', {title : "Tech Bay | Admin | Product Management"});
    },
    /*  
        Route: GET admin/product/edit/:product_id
        Purpose: Render the products edit page
    */
        renderProductEditPage : (req, res) => {
            return res.render('admin/product/productEdit', {title : "Tech Bay | Admin | Product Management"});
    },
}