const router = require('express').Router();

const controller = require('../../controller/admin/adminController');

const noCaheMiddleware = require('../../middleware/noCacheMiddleware');
const authMiddleware = require('../../middleware/authMiddlewares')

const checkIsAutheticatedAndAdmin = authMiddleware.checkIsAutheticatedAndAdmin('/admin/login');


router.get('/', noCaheMiddleware,
    (req, res) => {
        if(req.isAuthenticated()){
            return res.redirect('/admin/dashboard');
        }
        
        return res.redirect('/admin/login')
})

// router.use(checkIsAutheticatedAndAdmin);

function menuChangerMiddleware(activeMenu = 'dashboard') {
    return (req, res, next) => {
        res.locals.menu = activeMenu;
        next()
    }
}

router.get('/dashboard', 
    noCaheMiddleware,
    menuChangerMiddleware('dashboard'),
    controller.renderDashboardPage
);

const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');

router.use('/category', menuChangerMiddleware('category'), categoryRouter);
router.use('/product', menuChangerMiddleware('product'), productRouter);
router.use('/user', menuChangerMiddleware('user'), userRouter);

module.exports = router;