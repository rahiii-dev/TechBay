const router = require('express').Router();

const controller = require('../../controller/categoryController');
const upload = require('../../config/multerConfig');

router.get('/list', controller.renderCategoryListPage);

router.get('/add', controller.renderCategoryAddPage);
router.post('/add', upload.single('image'), controller.createCategory);

router.get('/edit/:category_id', controller.renderUpdateCategorPage);
router.put('/edit/:category_id', upload.single('image'), controller.updateCategory);

router.delete('/delete/:category_id', controller.deleteCategory);

router.patch('/change_status/:category_id', controller.changeCategoryStatus);

module.exports = router;
