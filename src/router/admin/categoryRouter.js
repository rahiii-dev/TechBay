const router = require('express').Router();

const controller = require('../../controller/categoryController');

router.get('/list', controller.renderCategoryListPage);
router.get('/add', controller.renderCategoryAddPage);
router.post('/add', controller.createCategory);

module.exports = router;
