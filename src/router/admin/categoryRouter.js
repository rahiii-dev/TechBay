const router = require('express').Router();

const controller = require('../../controller/categoryController');
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

router.delete('/delete/:category_id', controller.deleteCategory);

router.patch('/change_status/:category_id', controller.changeCategoryStatus);

module.exports = router;
