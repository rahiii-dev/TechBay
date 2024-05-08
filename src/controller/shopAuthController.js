const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports = {
    /*  
        Route: GET /login
        Purpose: Render the Loginpage
    */
    renderLoginPage : (req, res) => {
        const errorObj = {};
        const flashMessages = req.flash('error');
        errorObj.emailError = flashMessages[0]?.message
        errorObj.email = flashMessages[0]?.email
        return res.render('user/account/login', {title : "Tech Bay | Login", errorObj });
    },
    /*  
        Route: GET /register
        Purpose: Render the Registerpage
    */
    renderRegisterPage : (req, res) => {
        return res.render('user/account/register', {title : "Tech Bay | Register"});
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
            
            console.log(newUser);
            return res.redirect("/login");
        } catch (error) {
            next(error)
        }
    }
}