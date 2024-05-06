
module.exports = {
    /*  
        Route: GET /login
        Purpose: Render the Loginpage
    */
    renderLoginPage : (req, res) => {
        const flashMessages = req.flash('error');
        return res.render('user/account/login', {title : "Tech Bay | Login", error : flashMessages[0]?.message , username : flashMessages[0]?.username});
    },
    /*  
        Route: GET /register
        Purpose: Render the Registerpage
    */
    renderRegisterPage : (req, res) => {
        return res.render('user/account/register', {title : "Tech Bay | Register"});
    },

}