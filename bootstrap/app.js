const config = require('./../config');

const path = require('path');
const http = require('http');
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
const webSockify = require('koa-websocket');//默认关闭socket

// const app = new Koa();
const app = webSockify(new Koa()); //默认关闭socket
app.env = config.env;
app.keys = [config.cookie.secret, config.cookie.turtle];
app.proxy = config.proxy;

if (config.env !== 'production') {
    // 配置控制台日志中间件
    app.use(koaLogger());
}

// 配置ctx.body解析中间件
app.use(bodyParser());

//配置json格式返回函数
app.use(json());


//api中间件验证
const apiMiddleware = require('./../app/middlewares/api');
app.use(apiMiddleware());

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
const routers = require('./router');
app.use(routers.routes()).use(routers.allowedMethods());

//默认关闭socket
//初始化WebSocket路由中间件
const wsRouters = require('./../app/routers/ws');
app.ws.use(wsRouters.routes()).use(wsRouters.allowedMethods());


let server = http.createServer(app.callback());
server.listen(config.port);
// server.listen(config.ssl_port);

//默认关闭socket
app.ws.listen({
    server: server,
});


console.log(`the server is start at port ${config.port}`);
// console.log(`the server is start at ssl_port ${config.ssl_port}`);