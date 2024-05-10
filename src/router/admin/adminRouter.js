const router = require('express').Router();

const controller = require('../../controller/adminController');

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

router.use(checkIsAutheticatedAndAdmin);

router.get('/dashboard', 
    noCaheMiddleware,
    controller.renderDashboardPage
);

module.exports = router;