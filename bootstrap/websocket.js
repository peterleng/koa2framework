/**
 * webSocket项目  侦听 3004 和 ssl 3005端口
 */
const config = require('./../config');

const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const session = require('koa-generic-session');
const RedisStore = require('koa-redis');
const webSockify = require('koa-websocket');//默认关闭socket

const app = webSockify(new Koa()); //默认关闭socket
app.env = config.env;
app.keys = [config.cookie.secret, config.cookie.turtle];
app.proxy = config.proxy;

// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());

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

//登录中间件验证
const authMiddleware = require('./../app/middlewares/auth');
app.use(authMiddleware());

//默认关闭socket
//初始化WebSocket路由中间件
const wsRouters = require('../app/routers/ws.router');
app.ws.use(wsRouters.routes()).use(wsRouters.allowedMethods());

let server = http.createServer(app.callback());
// server.listen(config.websocket.port);
// server.listen(config.websocket.ssl_port);

//监听socket
app.ws.listen({
    server: server,
    port: config.websocket.port
});

console.log(`the webSocket server is start at port ${config.websocket.port}`);
// console.log(`the webSocket server is start at ssl_port ${config.ssl_port}`);