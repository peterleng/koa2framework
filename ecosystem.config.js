module.exports = {
    /**
     * pm2启动配置，文件名可自定义，可使用json，js，yml文件
     */
    apps: [

        // First application
        {
            name: 'koa2framework',
            script: './bootstrap/app.js',
            instance: 'max',
            watch: true,
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
                COMMON_VARIABLE: 'true'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },

        /*
        // Second application
        {
            name: 'WEB',
            script: 'web.js'
        }
        */
    ]
};
