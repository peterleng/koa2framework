const router = require('koa-router')();

const commonController = require('./../controllers/home/CommonController');

const routers = router
    .post('common.upfile', '/upfile', commonController.upfile);

module.exports = routers;