/**
 * 聊天室页面
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
exports.roomIndex = async (ctx, next) => {
    await ctx.render('home/chat/index', {
        title: '聊天室'
    });
};