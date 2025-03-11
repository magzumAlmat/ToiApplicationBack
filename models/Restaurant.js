const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Restaurant = sequelize.define('Restaurant', {
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
                msg: 'Название ресторана обязательно'
            }
        }
    },
    capacity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Укажите вместимость'
            }
        }
    },
    cuisine: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Укажите тип кухни'
            }
        }
    },
    averageCost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: 'Средний чек не может быть отрицательным'
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
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                msg: 'Неверный формат телефона'
            }
        }
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Укажите район'
            }
        }
    },
    supplier_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    tableName: 'Restaurants', // Исправлено на точное совпадение с миграцией
    timestamps: true,
    createdAt: 'createdAt',   // Используем camelCase как в миграции
    updatedAt: 'updatedAt',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    }
});

module.exports = Restaurant;