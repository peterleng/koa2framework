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
const ajaxlogin = async (ctx, next) => {
    ctx.type = 'json';
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
        // ctx.body = result;
        ctx.redirect('/login');
    }
};

/**
 * 注册页
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const register = async (ctx, next) => {

    await ctx.render('home/register', {
        title: 'Index'
    });
};


/**
 * 注册操作
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const ajaxregister = async (ctx, next) => {
    ctx.type = 'json';

    let formData = ctx.request.body;

    let existOne = await userInfoRepository.findByEmailOrName(formData);

    if (existOne) {
        if (existOne.name === formData.userName) {
            result.message = '该用户名已存在';
            ctx.body = result;
            return
        }
        if (existOne.email === formData.email) {
            result.message = '该邮箱已存在';
            ctx.body = result;
            return
        }
    }

    let userResult = await userInfoRepository.create({
        email: formData.email,
        password: formData.password,
        name: formData.userName,
        nick: formData.nick,
        remark: formData.remark || '',
        level: 1,
    });

    // console.log(userResult);

    if (userResult && userResult.id * 1 > 0) {
        result.success = true
    } else {
        result.message = '系统错误';
    }

    ctx.body = result;
};


module.exports = {
    login,
    ajaxlogin,
    register,
    ajaxregister
};