const router = require('express').Router();

const passport = require('../../config/userPassport')
const controller = require('../../controller/shopAuthController');

const noCaheMiddleware = require('../../middleware/noCacheMiddleware');
const checkAuthenticated = require('../../middleware/authMiddlewares').checkAuthenticated('/login');
const checkNotAuthenticated = require('../../middleware/authMiddlewares').checkNotAuthenticated('/');

const formValidators = require('../../validators/formValidators');


router.use(['/login', '/register', '/logout'], noCaheMiddleware);


router.get('/login', checkNotAuthenticated, controller.renderLoginPage);

// Authentication
// local
router.post('/login', checkNotAuthenticated, 
    formValidators.loginFormValidator,
    formValidators.handleFormValidation('user/account/login', 'Tech Bay | Login'),
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        badRequestMessage: 'Missing username or password.',
        failureFlash: true
    })
);

// google
router.get('/auth/google', checkNotAuthenticated, passport.authenticate('google', {
    scope : ['email', 'profile'],
}));
router.get( '/auth/google/callback', passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/login'
}));

// facebook
router.get('/auth/error', (req, res) => res.send('Unknown Error'))
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { 
    successRedirect : '/',
    failureRedirect: '/login' 
}));

router.get('/register', checkNotAuthenticated, controller.renderRegisterPage);
router.post('/register', checkNotAuthenticated, 
    formValidators.registerFormValidator,
    formValidators.handleFormValidation('user/account/register', 'Tech Bay | Register'), 
    controller.createUser);

// logout
router.get('/logout', checkAuthenticated, (req, res, next) => {
    req.logOut((err) => {
        if(err) {return next(err)}
        res.redirect('/');
    });
})

module.exports = router;