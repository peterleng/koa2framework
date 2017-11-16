const sequelize = require('../utils/model');
const Sequelize = require('sequelize');

let Userinfo = sequelize.define('news', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            len: {
                args: [4, 60],
                msg: '标题长度为4-60个字符.'
            },
        }
    },
    author: {
        type: Sequelize.STRING(35),
        allowNull: false,
        validate: {
            len: {
                args: [2, 35],
                msg: '作者长度为2-35个字符.'
            },
        }
    },
    summary: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: '简介长度为1-255个字符.'
            },
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            len: {
                args: [2, 100000],
                msg: '内容长度为2-100000个字符.'
            },
        }
    },
    status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        validate: {
            isInt: {
                args: true,
                msg: '状态必须为数字类型.'
            },
        }
    }
}, {
    tableName: 'news',
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
});

module.exports = Userinfo;