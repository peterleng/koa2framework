const router = require('koa-router')();

const indexController = require('./../controllers/home/IndexController');
const userinfoController = require('./../controllers/home/UserInfoController');

const routers = router
    .get('/', indexController.index)
    .get('login', userinfoController.login)
    .post('dologin', userinfoController.dologin)
    .get('register', userinfoController.register)
    .post('doreg', userinfoController.doreg);


module.exports = routers;