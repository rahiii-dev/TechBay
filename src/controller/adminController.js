module.exports = {
    /*  
        Route: GET admin/
        Purpose: Render the Dasboard
    */
        renderDashboardPage : (req, res) => {
            return res.render('admin/dashboard', {title : "Tech Bay | Dashboard"});
        },
}