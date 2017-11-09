const index = async (ctx,next) => {
    ctx.response.body = 'api index page';
};


module.exports = {
    index
};