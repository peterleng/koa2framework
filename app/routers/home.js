const router = require('koa-router')();

const indexController = require('./../controllers/home/IndexController');
const userinfoController = require('./../controllers/home/UserInfoController');

const routers = router
    .get('home.index', '/', indexController.index)
    .get('home.login', 'login', userinfoController.login)
    .post('home.ajaxLogin', 'ajaxLogin', userinfoController.ajaxlogin)
    .get('home.register', 'register', userinfoController.register)
    .post('home.ajaxRegister', 'ajaxRegister', userinfoController.ajaxregister)
    .get('home.profile', 'profile', userinfoController.profile)
    .post('home.ajaxProfile', 'ajaxProfile', userinfoController.ajaxProfile)
    .get('home.logout', 'logout', userinfoController.logout);


module.exports = routers;