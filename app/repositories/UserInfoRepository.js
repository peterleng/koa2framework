const userModel = require('../models/UserInfo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const UserInfoRepository = {

    /**
     * 创建用户
     * @param  {object} user 用户信息
     * @return {object}      创建结果
     */
    async create(user) {
        return await userModel.create(user);
    },

    /**
     * 更新用户信息
     * @param {integer} id
     * @param {object} attrs
     * @return {Promise.<void>}
     */
    async update(id, attrs) {
        return userModel.findById(id).then(user => {
            return user.update(attrs);
        });
    },

    /**
     * 删除用户
     * @param id
     * @return {Promise.<void>}
     */
    async remove(id) {
        let instance = userModel.findOne({where: {id: id}});
        return instance.destroy({force: true});
    },


    /**
     * 查找存在用户信息
     * @param  {object} formData 查找的表单数据
     * @return {object|null}      查找结果
     */
    async findByEmailOrName(formData) {
        let resultData = await userModel.findOne({
            where: {
                [Op.or]: [{'email': formData.email}, {'name': formData.userName}]
            }
        });
        return resultData;
    },


    /**
     * 登录业务操作
     * @param  {object} formData 登录表单信息
     * @return {object}          登录业务操作结果
     */
    async findByNameAndPass(formData) {
        let resultData = await userModel.findOne({
            where: {
                'password': formData.password,
                'name': formData.userName
            }
        });
        return resultData;
    },


    /**
     * 根据用户名查找用户业务操作
     * @param  {string} userName 用户名
     * @return {object|null}     查找结果
     */
    async findByName(userName) {
        let resultData = await userModel.findOne({
            where: {
                'name': userName
            }
        });

        return resultData;
    }
};


module.exports = UserInfoRepository;