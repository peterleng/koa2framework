const router = require('koa-router')();

const exampleController = require('./../controllers/home/example');

const routers = router
    .get('/',exampleController.index);

module.exports = routers;