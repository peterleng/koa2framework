/**
 * 登录验证
 * @returns {function(*, *)}
 */
let authMiddleware = function () {

    let except = [
        '/api',
        '/admin',
        '/register',
        '/ajaxRegister',
        '/login',
        '/ajaxLogin',
        '/logout'
    ];

    function isInExcept(url) {
        if (!url || typeof url !== 'string') return false;

        for (let str of except) {
            if (url.startsWith(str)) return true;
        }

        return false;
    }

    return async (ctx, next) => {
        try {
            if (!isInExcept(ctx.request.url)) {
                let session = ctx.session, isLogin = session && session.isLogin === true;
                if (!isLogin) {
                    if (ctx.state.xhr) {
                        ctx.response.body = ctx.jsonError('请先登录.', 423);
                    } else {
                        ctx.redirect('/login');
                    }
                    return;
                }
            }
        } catch (error) {
            throw error;
        }

        await next();
    }
};

module.exports = authMiddleware;