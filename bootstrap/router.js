const router = require('koa-router')();


const home = require('./../app/routers/home');
const admin = require('./../app/routers/admin');
const api = require('./../app/routers/api');
const error = require('./../app/routers/error');


router.use('/', home.routes(), home.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/error', error.routes(), error.allowedMethods());


module.exports = router;