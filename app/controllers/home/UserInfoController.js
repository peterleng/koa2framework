const userInfoRepository = require('./../../repositories/UserInfoRepository');
const LoginError = require('./../../utils/errors/LoginError');
const json = require('./../../utils/json');


/**
 * 登录页
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.login = async (ctx, next) => {
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
exports.ajaxlogin = async (ctx, next) => {
    try {
        let formData = ctx.request.body;

        let userResult = await userInfoRepository.findByNameAndPass(formData);
        if (!userResult) {
            throw new LoginError('用户名或登录密码错误.');
        }

        if (userResult.id) {
            let session = ctx.session;
            session.isLogin = true;

            session.user = ctx.state = {
                id: userResult.id,
                email: userResult.email,
                name: userResult.name,
                nick: userResult.nick
            };
        } else {
            throw new LoginError('登录失败.');
        }

        ctx.response.body = json.success(null, '登录成功');
    } catch (err) {
        ctx.response.body = json.error(err.message, err.code);
    }
};


/**
 * 注册页
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.register = async (ctx, next) => {

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
exports.ajaxregister = async (ctx, next) => {
    try {
        let formData = ctx.request.body;
        let existOne = await userInfoRepository.findByEmailOrName(formData);

        if (existOne) {
            if (existOne.name === formData.userName) {
                throw new LoginError('该用户名已存在.');
            }
            if (existOne.email === formData.email) {
                throw new LoginError('该邮箱已存在.');
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

        if (!userResult || !userResult.id) {
            throw new LoginError('注册失败.');
        }

        let session = ctx.session;
        session.isLogin = true;

        session.user = ctx.state = {
            id: userResult.id,
            email: userResult.email,
            name: userResult.name,
            nick: userResult.nick
        };

        ctx.response.body = json.success(null, '注册成功');
    } catch (err) {
        ctx.response.body = json.error(err.message, err.code);
    }
};

/**
 * 退出
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.logout = async (ctx, next) => {
    try {

        ctx.session = null;
        // delete ctx.session.user;

        ctx.response.body = json.success(null, '退出成功');
    } catch (err) {
        ctx.response.body = json.error(err.message, err.code);
    }
};