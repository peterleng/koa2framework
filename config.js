const config = {

    env: 'development',//production

    timezone: 'Asia/Shanghai',

    port: 3000,
    ssl_port: 3001,
    proxy: true,
    domain: 'localhost',//nodejs.dev

    res_host: '/', // `http://res.${this.domain}/`

    cookie: {
        secret: 'koa2framework_secret',
        turtle: 'koa2framework_turtle'
    },

    session: {
        domain: 'localhost', // .nodejs.dev
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