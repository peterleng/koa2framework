const config = require('./../config');

const Koa = require('koa');
const routers = require('./routers/index');


const app = new Koa();


app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.port);