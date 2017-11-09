// const validator = require('validator');
const userModel = require('../models/UserInfo');


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

        let resultData = await userModel.findOne({where: {'name': userName}}) || {};
        let userInfo = {
            id: resultData.id,
            email: resultData.email,
            userName: resultData.name,
            remark: resultData.remark,
            createTime: resultData.create_time
        };
        return userInfo;
    },


    /**
     * 检验用户注册数据
     * @param  {object} userInfo 用户注册数据
     * @return {object}          校验结果
     */
    validatorSignUp(userInfo) {
        let result = {
            success: false,
            message: '',
        };

        if (/[a-z0-9\_]{6,16}/.test(userInfo.userName) === false) {
            result.message = '用户名格式为6-16位的小写字母，包括_';
            return result
        }
        if (!validator.isEmail(userInfo.email)) {
            result.message = '请输入正确的邮箱地址';
            return result
        }
        if (!/[\w+]{6,16}/.test(userInfo.password)) {
            result.message = '密码长度应该为6-16';
            return result
        }
        if (userInfo.password !== userInfo.confirmPassword) {
            result.message = '两次密码不一致';
            return result
        }

        result.success = true;

        return result
    }
};


module.exports = UserInfoRepository;