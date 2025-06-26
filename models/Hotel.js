const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Hotel = sequelize.define('Hotel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Наименование гостиницы обязательно'
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Адрес обязателен'
            }
        }
    },
    averageCheck: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: 'Средний чек не может быть отрицательным'
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
    tableName: "hotels",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
});

module.exports = Hotel;

