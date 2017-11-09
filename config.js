const config = {

    port: 3001,

    database: {
        host: '10.0.4.8',
        username: 'root',
        password: 'CenturyQWERT',
        database: 'test',
        port: '33066'
    },

    session: {
        domain: 'localhost',
        lifetime: 2 * 60 * 1000,
        cookie: '_koa2session',
        path: '/',
        httpOnly: true,
        secure: false
    },

    redis: {
        host: '10.0.4.49',
        password: '123456',
        port: 6379,
        database: 1,
        // persistent:1
    }
};

module.exports = config;