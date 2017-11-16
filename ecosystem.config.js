module.exports = {
    /**
     * pm2启动配置，文件名可自定义，可使用json，js，yml文件
     */
    apps: [

        // web application
        {
            name: 'koa2framework_web',
            script: './bootstrap/app.js',
            instance: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
                COMMON_VARIABLE: 'true',
                watch: true,
            },
            env_production: {
                NODE_ENV: 'production',
                watch: false,
            }
        },

        // api application
        {
            name: 'koa2framework_api',
            script: './bootstrap/api.js',
            instance: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
                COMMON_VARIABLE: 'true',
                watch: true,
            },
            env_production: {
                NODE_ENV: 'production',
                watch: false,
            }
        },

        // webSocket application
        {
            name: 'koa2framework_ws',
            script: './bootstrap/websocket.js',
            instance: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
                COMMON_VARIABLE: 'true',
                watch: true,
            },
            env_production: {
                NODE_ENV: 'production',
                watch: false,
            }
        },
    ]
};
