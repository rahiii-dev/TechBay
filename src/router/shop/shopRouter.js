const router = require('express').Router();

const controller = require('../../controller/shop/shopController');

const noCaheMiddleware = require('../../middleware/noCacheMiddleware');
const authMiddleware = require('../../middleware/authMiddlewares');
const isBlockedMiddleware = require('../../middleware/isBlockedMiddleware');

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
    isBlockedMiddleware,
    (req, res) => {
    res.send("<a class='btn btn-danger' href='/logout'>Logout</a>");
})


module.exports = router;