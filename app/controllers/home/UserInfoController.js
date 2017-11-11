const userInfoRepository = require('./../../repositories/UserInfoRepository');
const LoginError = require('./../../utils/errors/LoginError');

/**
 * 登录页
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.login = async (ctx, next) => {
    await ctx.render('home/user/login', {
        title: '登录页'
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

        ctx.response.body = ctx.jsonSuccess(null, '登录成功');
    } catch (err) {
        ctx.response.body = ctx.jsonError(err.message, err.code);
    }
};


/**
 * 注册页
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.register = async (ctx, next) => {

    await ctx.render('home/user/register', {
        title: '注册页'
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

        ctx.response.body = ctx.jsonSuccess(null, '注册成功');
    } catch (err) {
        ctx.response.body = ctx.jsonError(err.message, err.code);
    }
};

/**
 * 上传图像
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.profile = async (ctx, next) => {
    let username = ctx.session.user.name;

    const userResult = await userInfoRepository.findByName(username);

    await ctx.render('home/user/upload_icon', {
        title: '上传头像',
        userInfo: userResult
    });
};

/**
 * 处理上传头像
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.ajaxProfile = async (ctx, next) => {
    try {
        let formData = ctx.request.body;

        //TODO 保存头像


        ctx.response.body = ctx.jsonSuccess(null, '登录成功');
    } catch (err) {
        ctx.response.body = ctx.jsonError(err.message, err.code);
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

        ctx.response.body = ctx.jsonSuccess(null, '退出成功');
    } catch (err) {
        ctx.response.body = ctx.jsonError(err.message, err.code);
    }
};