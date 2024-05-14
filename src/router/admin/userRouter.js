const router = require('express').Router();

const controller = require('../../controller/admin/userController');

router.get(['/', '/list'], controller.renderUserListPage);

router.patch('/block/:user_id', controller.blockUser);
router.patch('/unblock/:user_id', controller.unBlockUser);

module.exports = router;
