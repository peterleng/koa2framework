const index = async (ctx,next) => {
    ctx.response.body = 'admin index page';
};


module.exports = {
    index
};