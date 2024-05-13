const router = require('express').Router();

const controller = require('../../controller/productController');

router.get('/list', controller.renderProductListPage);

router.get('/add', controller.renderProductAddPage);

router.get('/:product_id', controller.renderProductViewPage);

router.get('/edit/:product_id', controller.renderProductEditPage);


module.exports = router;