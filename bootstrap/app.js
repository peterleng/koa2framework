/**
 * web项目  侦听 3000 和 ssl 3001端口
 */
const config = require('./../config');

const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const session = require('koa-generic-session');
// const MysqlStore = require('koa-mysql-session');
const RedisStore = require('koa-redis');
const json = require('./../app/utils/json');
const isAjax = require('koa-isajax');

const app = new Koa();
app.env = config.env;
app.keys = [config.cookie.secret, config.cookie.turtle];
app.proxy = config.proxy;

// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());

//配置json格式返回函数
app.use(json());

//配置ajax判断
app.use(isAjax());

// 配置静态资源加载中间件  通过nginx处理静态文件时无需此配置
app.use(koaStatic(
    path.join(__dirname, './../static')
));

// 配置session中间件
app.use(session({
    key: config.session.cookie,
    /*store: new MysqlStore({
        user: config.database.username,
        password: config.database.password,
        database: config.database.database,
        host: config.database.host,
        port: config.database.port
    }),*/
    store: new RedisStore({
        host: config.redis.host,
        auth_pass: config.redis.password,
        port: config.redis.port,
        db: config.redis.db,
    }),
    cookie: {
        domain: config.session.domain,
        path: config.session.path,
        maxAge: config.session.lifetime,
        httpOnly: config.session.httpOnly,
        secure: config.session.secure,
        overwrite: false,
        signed: true
    }
}));

//配置模板渲染引擎中间件
app.use(views(path.join(__dirname, './../app/views'), {
    extension: 'ejs'
}));

//登录中间件验证
const authMiddleware = require('./../app/middlewares/auth');
app.use(authMiddleware());

//view共享参数
app.use(async (ctx, next) => {
    ctx.state.config = config;
    ctx.state.moment = require('moment');
    ctx.state.user = ctx.session.user;
    await next();
});

//初始化路由中间件
const routers = require('../app/routers/web.router');
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.web.port);
// app.listen(config.web.ssl_port);

console.log(`the web server is start at port ${config.web.port}`);
// console.log(`the web server is start at ssl_port ${config.web.ssl_port}`);