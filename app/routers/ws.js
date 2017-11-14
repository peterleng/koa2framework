const router = require('koa-router')();

const authController = require('./../controllers/ws/AuthWsController');

router.get('/wsauth/:uid', authController.auth);

module.exports = router;