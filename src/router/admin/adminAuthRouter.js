const router = require('express').Router();

const controller = require('../../controller/adminController');

const noCaheMiddleware = require('../../middleware/noCacheMiddleware');
const checkAuthenticated = require('../../middleware/authMiddlewares').checkAuthenticated('/login');

router.get('/', noCaheMiddleware ,controller.renderHomePage);


module.exports = router;