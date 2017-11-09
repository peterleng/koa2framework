const config = require('./../config');

const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const session = require('koa-generic-session');
const MysqlStore = require('koa-mysql-session');
const RedisStore = require('koa-redis');

const routers = require('./routers/index');

const app = new Koa();

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
        overwrite: false
    }
}));


// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname, './../static')
));

//配置模板渲染引擎中间件
app.use(views(path.join(__dirname, '/views'), {
    extension: 'ejs'
}));

//初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.port);

console.log(`the server is start at port ${config.port}`);