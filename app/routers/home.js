const router = require('koa-router')();

const indexController = require('./../controllers/home/IndexController');
const userinfoController = require('./../controllers/home/UserInfoController');

const routers = router
    .get('/', indexController.index)
    .get('login', userinfoController.login)
    .post('dologin', userinfoController.dologin);


module.exports = routers;