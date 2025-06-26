const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Typography = sequelize.define('Typography', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Наименование компании обязательно'
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Телефон обязателен'
            }
        }
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: {
                msg: 'Некорректная ссылка'
            }
        }
    }
}, {
    tableName: "typographies",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
});

module.exports = Typography;

