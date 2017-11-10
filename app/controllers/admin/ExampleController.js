/**
 * 示例
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.index = async (ctx,next) => {
    await ctx.render('admin/index',{
        title: 'Admin'
    })
};