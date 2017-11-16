const router = require('koa-router')();

const home = require('./web/home');
const admin = require('./web/admin');
const common = require('./web/common');
const error = require('./web/error');

router.use('/', home.routes(), home.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/common', common.routes(), common.allowedMethods());
router.use('/error', error.routes(), error.allowedMethods());

module.exports = router;