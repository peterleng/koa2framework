const index = async (ctx, next) => {

    ctx.session = {
        'test': 123456
    };

    await ctx.render('home/index', {
        title: 'Index'
    });
};


module.exports = {
    index
};