/**
 * api接口项目  侦听 3002 和 ssl 3003端口
 */
const config = require('./../config');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
// const RedisStore = require('koa-redis');
const json = require('./../app/utils/json');

const app = new Koa();
app.env = config.env;
app.proxy = config.proxy;

// 配置控制台日志中间件
app.use(koaLogger());

//api中间件验证
const apiMiddleware = require('./../app/middlewares/api');
app.use(apiMiddleware());

// 配置ctx.body解析中间件
app.use(bodyParser());

//配置json格式返回函数
app.use(json());

//初始化路由中间件
const routers = require('../app/routers/api.router');
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.api.port);
// app.listen(config.api.ssl_port);

console.log(`the api server is start at port ${config.api.port}`);
// console.log(`the api server is start at ssl_port ${config.api.ssl_port}`);