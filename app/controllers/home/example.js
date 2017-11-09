const index = async (ctx, next) => {
    await ctx.render('home/index', {
        title: 'Index'
    });

    // ctx.response.body = 'home index page';
};


module.exports = {
    index
};