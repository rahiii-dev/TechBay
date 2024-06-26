const router = require('express').Router();

const passport = require('../../config/userPassport')
const controller = require('../../controller/shop/shopAuthController');

const noCaheMiddleware = require('../../middleware/noCacheMiddleware');
const authMiddleware = require('../../middleware/authMiddlewares')
const formErrorHandler = require('../../middleware/formErrorHandler');

const checkAuthenticated = authMiddleware.checkAuthenticated('/login');
const checkNotAuthenticated = authMiddleware.checkNotAuthenticated('/');
const checkIsAdmin = authMiddleware.checkIsAdmin('/admin');

const formValidators = require('../../validators/AuthformValidators');

router.use(['/login', '/register', '/logout'], noCaheMiddleware);

router.get('/login',
    checkIsAdmin,
    checkNotAuthenticated, 
    controller.renderLoginPage);

// Authentication
// local
router.post('/login',
    checkIsAdmin,
    checkNotAuthenticated, 
    formValidators.loginFormValidator,
    formErrorHandler,
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

// google
router.get('/auth/google', 
    checkIsAdmin,
    checkNotAuthenticated, 
    passport.authenticate('google', {
    scope : ['email', 'profile'],
}));
router.get('/auth/google/callback', passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/login'
}));

// facebook
router.get('/auth/facebook',
    checkIsAdmin,
    checkNotAuthenticated,  
    passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { 
    successRedirect : '/',
    failureRedirect: '/login' 
}));

router.get('/register', 
    checkIsAdmin, 
    checkNotAuthenticated, 
    controller.renderRegisterPage);
router.post('/register', 
    checkIsAdmin,
    checkNotAuthenticated, 
    formValidators.registerFormValidator,
    formErrorHandler,
    controller.createUser);

// logout
router.get('/logout',
    checkIsAdmin,
    checkAuthenticated, 
    (req, res, next) => {
        req.logOut((err) => {
            if(err) {
                console.log("Error while Logging Out in shopAuthRouter.");
                return next(err)
            }
            res.redirect('/');
    });
})

module.exports = router;