const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('user-local', new LocalStrategy({passReqToCallback : true },
    function(req, username, password, done) {
        // logic
        let authenticated_user = { id: 123, name: 'kyle'};

        if(username !== 'kayle'){
            req.flash('error', { message: 'Invalid Username', username })
            return done(null, false);
        }

        if(username === 'kayle' && password === '123'){
            return done(null, authenticated_user);
        }
        
        req.flash('error', { message: 'Invalid Username or Password', username })
        return done(null, false);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
done(null, user);
});

module.exports = passport;