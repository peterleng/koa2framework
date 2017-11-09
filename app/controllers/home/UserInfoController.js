const userInfoRepository = require('./../../repositories/UserInfoRepository');
const result = require('./../../utils/jsonResponse');

/**
 * 登录页
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const login = async (ctx, next) => {
    await ctx.render('home/login', {
        title: 'Index'
    });
};

/**
 * 登录处理
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const dologin = async (ctx, next) => {
    let formData = ctx.request.body;

    let userResult = await userInfoRepository.findByNameAndPass(formData);
    if (!userResult) {
        result.message = '用户名或登录密码错误';
    }

    if (formData.source === 'form' && result.success === true) {
        let session = ctx.session;
        session.isLogin = true;
        session.userName = userResult.name;
        session.userId = userResult.id;

        ctx.redirect('/');
    } else {
        ctx.body = result;
    }
};


module.exports = {
    login,
    dologin
};