const config = {

    env: 'development',//production
    proxy: true,
    timezone: 'Asia/Shanghai',

    domain: 'nodejs.dev',//nodejs.dev
    res_host: 'http://res.nodejs.dev/', // http://res.nodejs.dev/

    web: {
        port: 3000,
        ssl_port: 3001,
    },
    api: {
        port: 3002,
        ssl_port: 3003,
    },
    websocket: {
        port: 3004,
        ssl_port: 3005,
    },

    cookie: {
        secret: 'koa2framework_secret',
        turtle: 'koa2framework_turtle'
    },

    session: {
        domain: '.nodejs.dev', // .nodejs.dev
        lifetime: 2 * 60 * 60 * 1000,
        cookie: '_koa2session',
        path: '/',
        httpOnly: true,
        secure: false
    },

    database: {
        host: '10.0.4.8',
        username: 'root',
        password: 'CenturyQWERT',
        database: 'test',
        port: 33066
    },

    redis: {
        host: '10.0.4.49',
        password: '123456',
        port: 6379,
        db: 1,
        // persistent:1
    }
};

module.exports = config;