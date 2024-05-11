module.exports = {
    /*  
        Route: GET category/list
        Purpose: Render the category list page
    */
    renderCategoryListPage : (req, res) => {
        return res.render('admin/category/categoryList', {title : "Tech Bay | Admin | Category Management"});
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
    createCategory : (req, res) => {
        console.log(req.body)
        return res.redirect('/admin/category/list')
    },
}