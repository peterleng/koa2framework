/**
 * 接口验证
 * @returns {function(*, *)}
 */
let apiMiddleware = function () {

    return async (ctx, next) => {
        try {
            if (ctx.request.url.startsWith('/api')) {

                //TODO sign validate
                // if false ctx.throw('签名错误.');
            }
        } catch (err) {
            ctx.response.body = ctx.jsonError(err.message, err.code);
            return;
        }

        await next();
    }
};

module.exports = apiMiddleware;