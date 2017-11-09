const index = async (ctx,next) => {
    ctx.response.body = 'home index page';
};


module.exports = {
    index
};