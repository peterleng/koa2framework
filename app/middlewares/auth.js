const result = require('./../utils/jsonResponse');

/**
 * 登录验证
 * @returns {function(*, *)}
 */
let authMiddleware = function () {

    let except = [
        '/api',
        '/register',
        '/login',
        '/logout'
    ];

    function isInExcept(url) {
        if (!url || typeof url !== 'string') return false;

        for (let str of except) {
            if (url.toLowerCase().startsWith(str)) return true;
        }

        return false;
    }


    return async (ctx, next) => {
        try {
            if (!isInExcept(ctx.request.url)) {
                let session = ctx.session;
                if (!session.isLogin) {
                    ctx.redirect('/login');
                }
            }
        } catch (error) {
            throw error;
        }

        await next();
    }
};


module.exports = authMiddleware;