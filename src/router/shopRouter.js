const router = require('express').Router({mergeParams : true});

const userpPassport = require('../config/userPassport')
const controller = require('../controller/shopController');
const userController = require('../controller/userController');

const noCaheMiddleware = require('../middleware/noCacheMiddleware');
const isAuthenticated = require('../middleware/authMiddlewares').isAuthenticated('/login');
const isNotAuthenticated = require('../middleware/authMiddlewares').isNotAuthenticated('/');


router.use(['/', '/login', '/register', '/logout'], noCaheMiddleware);

// public rotes
router.get('/', controller.renderHomePage);

router.get('/login', isNotAuthenticated, userController.renderLoginPage);
router.post('/login', isNotAuthenticated, userpPassport.authenticate('user-local', {
    successRedirect : '/',
    failureRedirect: '/login',
    badRequestMessage : 'Missing username or password.',
    failureFlash: true
}));

router.get('/register', isNotAuthenticated, userController.renderRegisterPage);

// public routes
router.get('/protected', isAuthenticated, (req, res) => {
    res.send("<a class='btn btn-danger' href='/logout'>Logout</a>");
})
router.get('/logout', isAuthenticated, (req, res, next) => {
    req.logOut((err) => {
        if(err) {return next(err)}
        res.redirect('/');
    });
})

module.exports = router;