const router = require('express').Router();

const controller = require('../../controller/shopController');

const noCaheMiddleware = require('../../middleware/noCacheMiddleware');
const authMiddleware = require('../../middleware/authMiddlewares')

const checkAuthenticated = authMiddleware.checkAuthenticated('/login');
const checkIsAdmin = authMiddleware.checkIsAdmin('/admin');

// public rotes
router.get('/', 
    checkIsAdmin,
    noCaheMiddleware ,
    controller.renderHomePage);

// private routes
router.get('/protected', 
    checkIsAdmin,
    checkAuthenticated,
    (req, res) => {
    res.send("<a class='btn btn-danger' href='/logout'>Logout</a>");
})


module.exports = router;