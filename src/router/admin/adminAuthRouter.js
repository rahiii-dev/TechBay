const router = require('express').Router();

const controller = require('../../controller/adminAuthController');

const noCaheMiddleware = require('../../middleware/noCacheMiddleware');
const authMiddleware = require('../../middleware/authMiddlewares')
const formValidators = require('../../validators/AuthformValidators');
const formErrorHandler = require('../../middleware/formErrorHandler');

const checkAdminNotAuthenticated = authMiddleware.checkAdminNotAuthenticated('/admin/dashboard');
const checkIsAutheticatedAndUser = authMiddleware.checkIsAutheticatedAndUser('/');
const checkIsAutheticatedAndAdmin = authMiddleware.checkIsAutheticatedAndAdmin('/admin/login');

router.use(checkIsAutheticatedAndUser);

router.get('/login',
    noCaheMiddleware,
    checkAdminNotAuthenticated,
    controller.renderLoginPage
);
router.post('/login',
    noCaheMiddleware,
    checkAdminNotAuthenticated,
    formValidators.loginFormValidator,
    formErrorHandler('admin/login', "Tech Bay | Admin | Login"),
    controller.authenticateUser
);

router.get('/logout',
    checkIsAutheticatedAndAdmin,
    noCaheMiddleware,
    controller.logoutUser
)
module.exports = router;