const router = require('koa-router')();

const exampleController = require('./../controllers/api/ExampleController');

const routers = router
    .get('api.index', '/', exampleController.index);

module.exports = routers;

