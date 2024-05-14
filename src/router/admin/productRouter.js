const router = require('express').Router();

const controller = require('../../controller/admin/productController');

const multer = require('multer');
const multerConfig = require('../../config/multerConfig');
const upload = multer({
    storage : multerConfig.productStorage
})

const formValidator = require('../../validators/productFormValidators');
const formErrorHandler = require('../../middleware/formErrorHandler');

router.get('/list', controller.renderProductListPage);

router.get('/add', controller.renderProductAddPage);
router.post('/add', 
    upload.any('images', 3),
    formValidator.addAndEditFormValidator,
    formValidator.addFormValidator,
    formErrorHandler, 
    controller.createProduct);

router.get('/:product_id', controller.renderProductViewPage);

router.get('/edit/:product_id', controller.renderProductEditPage);
router.put('/edit/:product_id', 
    upload.any('images', 3),
    formValidator.addAndEditFormValidator,
    formErrorHandler, 
    controller.updateProduct);

router.patch('/softdelete/:product_id', controller.softDeleteProduct);
router.patch('/restore/:product_id', controller.restoreProduct);



module.exports = router;