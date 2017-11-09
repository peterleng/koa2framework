const result = require('./../utils/jsonResponse');

let apiMiddleware = function () {
    return async (ctx, next) => {
        ctx.type = 'json';
        ctx.status = 200;

        try {
            if (ctx.request.url.startsWith('/api')) {

                //TODO sign validate
                //if false throw new Error('签名错误');
            }

            await next();
        } catch (error) {
            result.message = error.message;
            result.code = error.code;
            ctx.response.body = result;
        }
        if (ctx.response.body) {
            result.success = true;
            result.code = 200;
            result.data = ctx.response.body;
        }
        ctx.response.body = result;
    }
};


module.exports = apiMiddleware;