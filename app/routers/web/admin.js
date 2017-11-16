const router = require('koa-router')();

const exampleController = require('../../controllers/admin/ExampleController');

const routers = router
    .get('admin.index', '/', exampleController.index);

module.exports = routers;
