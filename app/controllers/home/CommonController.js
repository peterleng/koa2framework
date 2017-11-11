const multer = require('koa-multer');

const upload = multer({dest: 'static/upload/'});

/**
 * 上传文件
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
module.exports.upfile = async (ctx, next) => {

    try {
        let result = await upload.single('upfile')(ctx, next);
        
        ctx.response.body = ctx.jsonSuccess({url: '', value: ''}, msg);
    } catch (err) {
        ctx.response.body = ctx.jsonError(err.message, err.code);
    }

};