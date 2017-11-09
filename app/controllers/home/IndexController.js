
/**
 * 首页
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const index = async (ctx, next) => {
    /*let session = ctx.session;
    if(!session.isLogin){
        ctx.redirect('/login');
    }*/

    await ctx.render('home/index', {
        title: 'Index'
    });
};


module.exports = {
    index
};