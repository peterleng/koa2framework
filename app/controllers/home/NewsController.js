const newsRepository = require('./../../repositories/NewsRepository');

/**
 * 新闻列表页
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
exports.index = async (ctx, next) => {

    let page = ctx.request.query.page || 1;
    // let params = ctx.request.params;
    let newsResult = await newsRepository.getHomePages(page, 15);

    await ctx.render('home/news/list', {
        title: '新闻列表',
        newslist: newsResult
    });
};

/**
 * 添加新闻
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
exports.add = async (ctx, next) => {
    await ctx.render('home/news/add', {
        title: '添加新闻'
    });
};

/**
 * 修改页
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
exports.edit = async (ctx, next) => {
    let id = ctx.params.id;
    let newsResult = await newsRepository.findById(id);

    await ctx.render('home/news/edit', {
        title: '修改新闻',
        newsinfo: newsResult
    });
};


/**
 * 保存新闻
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
exports.save = async (ctx, next) => {

    try {
        let newsResult;
        let formData = ctx.request.body;

        if (formData.id) {
            newsResult = await newsRepository.update(formData.id, {
                title: formData.title,
                author: formData.author,
                summary: formData.summary,
                content: formData.content,
                status: formData.status,
            });
        } else {
            newsResult = await newsRepository.create({
                title: formData.title,
                author: formData.author,
                summary: formData.summary,
                content: formData.content,
                status: formData.status,
            });
        }

        if (!newsResult || !newsResult.id) {
            ctx.throw('保存失败.');
        }

        ctx.redirect('/news');
    } catch (err) {
        ctx.redirect('/news/add');
    }
};

/**
 * 删除
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
exports.remove = async (ctx, next) => {

    try {
        let formData = ctx.request.body;
        let newsResult = await newsRepository.remove(formData.id);

        if (!newsResult) {
            ctx.throw('删除失败.');
        }

        ctx.response.body = ctx.jsonSuccess(null, '删除成功');
    } catch (err) {
        ctx.response.body = ctx.jsonError(err.message, err.code);
    }
};