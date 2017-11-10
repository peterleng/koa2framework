/**
 * 首页
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const index = async (ctx, next) => {
    await ctx.render('home/index', {
        title: 'Index'
    });
};


module.exports = {
    index
};