const router = require('express').Router();

const controller = require('../../controller/admin/categoryController');
const formValidator = require('../../validators/categoryFormValidators');
const formErrorHandler = require('../../middleware/formErrorHandler');

router.get('/list', controller.renderCategoryListPage);

router.get('/add', controller.renderCategoryAddPage);
router.post('/add',
     formValidator.addOrEditFormValidator,
     formValidator.addFormValidator,
     formErrorHandler,
     controller.createCategory);

router.get('/edit/:category_id', controller.renderUpdateCategorPage);
router.put('/edit/:category_id',
formValidator.addOrEditFormValidator,
formValidator.editFormValidator,
formErrorHandler, 
controller.updateCategory);

router.patch('/softdelete/:category_id', controller.softDeleteCategory);
router.patch('/restore/:category_id', controller.restoreCategory);

module.exports = router;
