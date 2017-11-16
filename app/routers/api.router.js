const router = require('koa-router')();

const exampleController = require('./../controllers/api/ExampleController');

router.get('api.index','/', exampleController.index);

module.exports = router;