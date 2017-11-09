const router = require('koa-router')();

const indexController = require('./../controllers/home/IndexController');
const userinfoController = require('./../controllers/home/UserInfoController');

const routers = router
    .get('/', indexController.index)
    .get('login', userinfoController.login)
    .post('ajaxLogin', userinfoController.ajaxlogin)
    .get('register', userinfoController.register)
    .post('ajaxRegister', userinfoController.ajaxregister);


module.exports = routers;