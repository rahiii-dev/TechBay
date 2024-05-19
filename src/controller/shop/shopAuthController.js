const User = require('../../model/userModel');
const bcrypt = require('bcrypt');

module.exports = {
    /*  
        Route: GET /login
        Purpose: Render the Loginpage
    */
    renderLoginPage : (req, res) => {
        const errorObj = req.flash('errorObj')[0];
        const warningObj = req.flash('warning-message')[0];
        return res.render('user/account/login', {title : "Tech Bay | Login", errorObj, warningObj});
    },
    /*  
        Route: GET /register
        Purpose: Render the Registerpage
    */
    renderRegisterPage : (req, res) => {
        const errorObj = req.flash('errorObj')[0];
        console.log(errorObj);
        return res.render('user/account/register', {title : "Tech Bay | Register", errorObj});
    },
    /*  
        Route: post /register
        Purpose: Creating a user
    */
    createUser : async (req, res, next) => {
        try {
            const {email, phone, password} = req.body;
            const hashedPass = await bcrypt.hash(password, 10);
            const newUser = new User({email, phone, password : hashedPass});
            await newUser.save();
            
            return res.redirect("/login");
        } catch (error) {
            next(error)
        }
    }
}