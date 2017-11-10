const sequelize = require('./../../lib/model');
const Sequelize = require('sequelize');

let Userinfo = sequelize.define('userinfo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: '邮箱格式不正确.'
            },
            len: {
                args: [5, 60],
                msg: '邮箱长度为5-60个字符.'
            },
        }
    },
    password: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
            len: {
                args: [6, 16],
                msg: '密码长度为6-16个字符.'
            },
        }
    },
    name: {
        type: Sequelize.STRING(35),
        allowNull: false,
        validate: {
            is: {
                args: /^[a-z0-9_]+$/i,
                msg: '用户名只能是英文数字下划线.'
            },
            len: {
                args: [4, 20],
                msg: '用户名长度为4-20个字符.'
            },
        }
    },
    nick: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            len: {
                args: [2, 16],
                msg: '昵称长度为2-16个字符.'
            },
        }
    },
    remark: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    level: {
        type: Sequelize.TINYINT,
        allowNull: false,
        validate: {
            isInt: {
                args: true,
                msg: '等级必须为数字类型.'
            },
        }
    }
}, {
    tableName: 'user_info',
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
});

module.exports = Userinfo;