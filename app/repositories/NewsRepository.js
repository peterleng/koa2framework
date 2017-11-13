const newsModel = require('../models/News');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const NewsRepository = {

    /**
     * 创建新闻
     * @param  {object} news 新闻内容
     * @return {object}      创建结果
     */
    async create(news) {
        return await newsModel.create(news);
    },

    /**
     * 更新新闻内容
     * @param {integer} id
     * @param {object} attrs
     * @return {Promise.<void>}
     */
    async update(id, attrs) {
        return newsModel.findById(id).then(news => {
            return news.update(attrs);
        });
    },

    /**
     * 删除新闻
     * @param id
     * @return {Promise.<void>}
     */
    async remove(id) {

        return newsModel.destroy({where: {id: id}, force: true});
    },


    /**
     * 查找单条新闻
     * @param  {integer} id 查找的表单数据
     * @return {object|null}      查找结果
     */
    async findById(id) {
        let resultData = await newsModel.findById(id);
        return resultData;
    },

    /**
     * 分页新闻
     * @param page
     * @param pagesize
     * @return {Promise.<Array.<Model>>}
     */
    async getHomePages(page, pagesize) {
        let resultData = await newsModel.findAll({
            order: [['create_time', 'DESC']],
            offset: (page - 1) * pagesize,
            limit: pagesize
        });
        return resultData;
    }

};


module.exports = NewsRepository;