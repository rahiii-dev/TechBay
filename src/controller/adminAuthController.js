const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");

module.exports = {
    /*  
        Route: GET admin/login
        Purpose: Render the Dasboard
    */
        renderLoginPage : (req, res) => {
            const errorObj = {};
            const flashMessages = req.flash('error');
            errorObj.emailError = flashMessages[0]?.message
            errorObj.email = flashMessages[0]?.email
            return res.render('admin/login', {title : "Tech Bay | Admin | Login", errorObj});
        },
    /*  
        Route: POST admin/login
        Purpose: authenticate admin user
    */
        authenticateUser : async (req, res, next) => {
            try {
                const {email, password} = req.body;
                const adminObj = await Admin.findOne({email})
                if (adminObj) {
                    const match = await bcrypt.compare(password, adminObj.password);
        
                    if (match) {
                        req.session.isAuthenticated = true;
                        req.session.isAdmin = true;
                        return res.redirect('/admin/dashboard')
                    }
                    
                    req.flash('error', { message: 'Invalid Email or Password', email })

                    return res.redirect('/admin/login');
                }
        
                req.flash('error', { message: 'Invalid Email', email })
                return res.redirect('/admin/login');
            }
            catch(err){
                console.error('Error during admin authentication:', err);
                next(err);
            }
        },
        /*  
        Route: GET admin/logout
        Purpose: logout admin
        */
        logoutUser : (req, res, next) => {
            if (req.session) {
                req.session.destroy(err => {
                  if (err) {
                    console.log("Error while logging out");
                    next(err)
                  } else {
                    res.redirect('/admin/login');
                  }
                });
              } else {
                res.end()
            }
        },
}