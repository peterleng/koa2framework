const router = require('koa-router')();

const exampleController = require('../controllers/admin/ExampleController');

const routers =
    router.get('/',exampleController.index);

module.exports = routers;
