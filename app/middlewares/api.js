const json = require('./../utils/json');

/**
 * 接口验证
 * @returns {function(*, *)}
 */
let apiMiddleware = function () {

    return async (ctx, next) => {
        ctx.type = 'json';
        ctx.status = 200;

        try {
            if (ctx.request.url.startsWith('/api')) {

                //TODO sign validate
                //if false throw new Error('签名错误');

                await next();

                if (ctx.response.body) {
                    ctx.response.body = json.success(ctx.response.body);
                }

            } else {
                await next();
            }
        } catch (err) {
            ctx.response.body = json.error(err.message, err.code);
        }
    }
};

module.exports = apiMiddleware;