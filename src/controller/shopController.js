module.exports = {
    /*  
        Route: GET /
        Purpose: Render the homepage
    */
    renderHomePage : (req, res) => {
        res.render('user/home', {title : "Tech Bay | Home"});
    },
}