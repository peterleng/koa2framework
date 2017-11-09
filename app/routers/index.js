const router = require('koa-router')();


const home = require('./home');
const admin = require('./admin');
const api = require('./api');
const error = require('./error');


router.use('/',home.routes(),home.allowedMethods());
router.use('/admin',admin.routes(),admin.allowedMethods());
router.use('/api',api.routes(),api.allowedMethods());
router.use('/error',error.routes(),error.allowedMethods());


module.exports = router;