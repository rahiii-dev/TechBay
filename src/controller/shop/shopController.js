module.exports = {
    /*  
        Route: GET /
        Purpose: Render the homepage
    */
    renderHomePage : (req, res) => {
        const isAuthenticated = req.isAuthenticated() || req.session.isAuthenticated;
        res.render('user/home', {title : "Tech Bay | Home", isAuthenticated});
    },
}