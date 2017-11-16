const router = require('koa-router')();

const indexController = require('../../controllers/home/IndexController');
const userinfoController = require('../../controllers/home/UserInfoController');
const newsController = require('../../controllers/home/NewsController');
const roomController = require('../../controllers/home/ChatRoomController');

const routers = router
    .get('home.index', '/', indexController.index)
    .get('home.login', 'login', userinfoController.login)
    .post('home.ajaxLogin', 'ajaxLogin', userinfoController.ajaxlogin)
    .get('home.register', 'register', userinfoController.register)
    .post('home.ajaxRegister', 'ajaxRegister', userinfoController.ajaxregister)
    .get('home.profile', 'profile', userinfoController.profile)
    .post('home.ajaxProfile', 'ajaxProfile', userinfoController.ajaxProfile)
    .get('home.logout', 'logout', userinfoController.logout)
    .get('home.news.list', 'news', newsController.index)
    .get('home.news.add', 'news/add', newsController.add)
    .get('home.news.edit', 'news/edit/:id', newsController.edit)
    .post('home.news.save', 'news/save', newsController.save)
    .post('home.news.del', 'news/remove', newsController.remove)
    .get('home.chat.room', 'chatroom', roomController.roomIndex)
    .get('home.logout', 'logout', userinfoController.logout);


module.exports = routers;