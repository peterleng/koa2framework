const index = async (ctx,next) => {
    await ctx.render('admin/index',{
        title: 'Admin'
    })
};


module.exports = {
    index
};