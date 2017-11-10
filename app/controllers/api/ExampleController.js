/**
 * 示例
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.index = async (ctx,next) => {
    ctx.response.body = 'api index page';
};
