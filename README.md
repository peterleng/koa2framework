# koa2framework
> 一个可以快速搭建koa2基础项目的框架

1, 安装Linux Binaries(64)版本node.js
```
xz -d node-(version).tar.xz
tar xvf node-(version).tar

ln -s /mypath/node-(version)/bin/node /usr/local/bin/node
ln -s /mypath/node-(version)/bin/npm /usr/local/bin/npm

```

2, 直接运行如下命令安装依赖包：
```
cd project_dir

npm install

```

3, 修改config中的参数；

4, 配置nginx反向代理子域名：
```
server
{
    listen 80;
    server_name admin.nodejs.dev;
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass http://127.0.0.1:3000/admin/;
        proxy_redirect off;
    }
}

server
{
    listen 80;
    server_name api.nodejs.dev;
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass http://127.0.0.1:3000/api/;
	    proxy_redirect off;
    }
}

server
{
    listen 80;
    server_name www.nodejs.dev nodejs.dev;
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "upgrade";
        proxy_set_header Upgrade $http_upgrade;
        proxy_pass http://127.0.0.1:3000;
        proxy_redirect off;
    }
}

server
{
    listen 80;
    server_name res.nodejs.dev;
    index index.html index.htm index.php;
    root  /webser/www/nodejs/koa2framework/static;
    rewrite_log off;
    
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {       
         expires      30d;
         access_log off;
    }
                
    location ~ .*\.(js|css)?$
    {       
         expires      1h;
         access_log off;
    }
}

```

5, 使用pm2方式运行nodejs项目，提高系统吞吐率
1. 配置pm2环境
    > 这时不可使用软连方式启动npm和node命令，需要配置path环境
      
    ```
    vi /etc/profile
    
    export NODE_HOME=/mypath/node
    export PATH=$NODE_HOME/bin:$PATH 
    ```
2. 安装pm2
    ```
    npm install pm2 -g
    ```
3. pm2配置文件
    > 生成pm2配置文件，可使用js、json、yml三种文件格式
    ```
    pm2 ecosystem
    ```
    以上命令会自动生成一个 ecosystem.config.js 文件，修改为自己项目的配置后：
    ```js
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
    ```
4. 最后启动项目
```
pm2 start ecosystem.config.js
```
启动成功，便可以看到如下的信息
```
┌───────────────┬────┬─────────┬──────┬────────┬─────────┬────────┬─────┬───────────┬──────┬──────────┐
│ App name      │ id │ mode    │ pid  │ status │ restart │ uptime │ cpu │ mem       │ user │ watching │
├───────────────┼────┼─────────┼──────┼────────┼─────────┼────────┼─────┼───────────┼──────┼──────────┤
│ koa2framework │ 0  │ cluster │ 9313 │ online │ 1       │ 0s     │ 90% │ 17.3 MB   │ root │ enabled  │
└───────────────┴────┴─────────┴──────┴────────┴─────────┴────────┴─────┴───────────┴──────┴──────────┘
```
    