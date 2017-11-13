# koa2framework
> 一个可以快速搭建koa2基础项目的框架

1, 直接运行如下命令安装依赖包：
```
npm install
```

2, 修改config中的参数；

3, 配置nginx代理：
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
        proxy_set_header Connection "";
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