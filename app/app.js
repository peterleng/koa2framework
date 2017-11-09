const config = require('./../config');

const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const routers = require('./routers/index');


const app = new Koa();


// 配置ctx.body解析中间件
app.use(bodyParser());

//配置模板渲染引擎中间件
app.use(views(path.join(__dirname, '/views'), {
    extension: 'ejs'
}));

//初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.port);

console.log(`the server is start at port ${config.port}`);