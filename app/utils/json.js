/**
 * 响应json返回
 * @returns {function(*, *)}
 */
module.exports = () => {
    return async (ctx, next) => {

        ctx.jsonSuccess = (data, msg) => {
            ctx.type = 'json';
            ctx.status = '200';
            return {success: true, message: msg || '', data: data || null, code: 200};
        };

        ctx.jsonError = (msg, code) => {
            if (msg && msg.indexOf('Validation error') > -1) {
                let errors = msg.split(',\n'), last = errors[errors.length - 1];
                if (last && last.indexOf(':') > -1) {
                    let arr = last.split(':');
                    msg = arr[1] || '系统错误';
                }
            }
            ctx.type = 'json';
            ctx.status = '200';

            return {success: false, message: msg, data: null, code: code || 400};
        };

        await next();
    };
};
