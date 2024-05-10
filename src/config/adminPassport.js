const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../model/adminModel');
const bcrypt = require('bcrypt');

passport.use('local', new LocalStrategy({
    usernameField : 'email',
    passReqToCallback : true 
},
async function(req, email, password, done) {
    try {
        const adminObj = await Admin.findOne({email})
        if (adminObj) {
            const match = await bcrypt.compare(password, adminObj.password);

            if (match) {
                req.session.isAuthenticated = true;
                req.session.isAdmin = true;
                return done(null, { id: adminObj.id, isAdmin: true });
            }
            
            req.flash('error', { message: 'Invalid Email or Password', email })
            return done(null, false);
        }

        req.flash('error', { message: 'Invalid Email', email })
        return done(null, false);
    }
    catch(err){
        return done(err, false);
    }
}
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(async function(user, done) {
    done(null, user)
    // try {
    //     const user = await Admin.findById(userId);
    //     done(null, user);
    // } catch (err) {
    //     done(err);
    // }
});

module.exports = passport;