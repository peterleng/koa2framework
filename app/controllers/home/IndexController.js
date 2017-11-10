/**
 * 首页
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
module.exports.index = async (ctx, next) => {
    await ctx.render('home/index', {
        title: 'Index'
    });
};