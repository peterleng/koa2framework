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
        unique: true
    },
    password: {
        type: Sequelize.STRING(64),
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(35),
        allowNull: false,
    },
    nick: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    remark: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    level: {
        type: Sequelize.TINYINT,
        allowNull: false,
    }
}, {
    tableName: 'user_info',
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
    /*hooks: {
        beforeValidate: function (obj) {
            let now = Date.now();
            if (obj.isNewRecord) {
                obj.createdAt = now;
                obj.updatedAt = now;
                obj.version = 0;
            } else {
                obj.updatedAt = Date.now();
                obj.version++;
            }
        }
    }*/
});

module.exports = Userinfo;