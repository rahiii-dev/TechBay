if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const serverConfig = require('./serverConfig');

const User = require('../model/userModel');
const bcrypt = require('bcrypt');

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('Missing required environment variables for Google Authentication');
}
if (!process.env.FB_APP_ID || !process.env.FB_APP_SECRET) {
    throw new Error('Missing required environment variables for Facebook Authentication');
}

// Document Refered: https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5
passport.use('local', new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true 
    },
    async function(req, email, password, done) {
        try {
            const userObj = await User.findOne({email})
            if(userObj){
                const match = bcrypt.compare(password, userObj.password);
                if(match){
                    return done(null, {id : userObj.id});
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

// Document Reffered: https://medium.com/@prashantramnyc/how-to-implement-google-authentication-in-node-js-using-passport-js-9873f244b55e
passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${serverConfig.domain()}/auth/google/callback`,
    passReqToCallback   : true
  }, async function(request, accessToken, refreshToken, profile, done) {
    try {
        const userObj = await User.findOne({
            $or : [
                {email: profile.email},
                {googleId: profile.id}
            ]
        });

        if(userObj){
            if(!userObj.googleId){
                userObj.googleId = profile.id;
                await userObj.save();
            }
            return done(null, {id : userObj.id});
        }

        const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.email
        });

        await newUser.save();
        return done(null, { id: newUser.id });

    } catch (err) {
        done(err, false); 
    }
  }
));

// document referred https://medium.com/swlh/node-and-passport-js-facebook-authentication-76cbfa903ff3
passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: `${serverConfig.domain()}/auth/facebook/callback`,
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
        const userObj = await User.findOne({facebookId : profile.id});

        if(userObj){
            if(!userObj.facebookId){
                userObj.facebookId = profile.id;
                await userObj.save();
            }
            return done(null, {id : userObj.id});
        }

        const newUser = new User({
            facebookId: profile.id,
            name: profile.displayName,
        });

        await newUser.save();
        return done(null, { id: newUser.id });

    } catch (err) {
        done(err, false); 
    }
  }
  ));

passport.serializeUser(function(userObj, done) {
    done(null, userObj);
  });
  
passport.deserializeUser(async function(userObj, done) {
    try {
        const user = await User.findById(userObj.id);
        done(null, user); 
    } catch (err) {
        done(err); 
    }
});

module.exports = passport;