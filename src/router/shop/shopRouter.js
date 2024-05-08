const router = require('express').Router();

const controller = require('../../controller/shopController');

const noCaheMiddleware = require('../../middleware/noCacheMiddleware');
const checkAuthenticated = require('../../middleware/authMiddlewares').checkAuthenticated('/login');

// public rotes
router.get('/', noCaheMiddleware ,controller.renderHomePage);

// private routes
router.get('/protected', checkAuthenticated, (req, res) => {
    res.send("<a class='btn btn-danger' href='/logout'>Logout</a>");
})


module.exports = router;