const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Clothing = sequelize.define('Clothing', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    storeName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Наименование магазина обязательно' }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Адрес обязателен' }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: { args: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, msg: 'Неверный формат телефона' }
        }
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Укажите район или "за пределами Алматы"' }
        }
    },
    gender: {
        type: DataTypes.ENUM('мужской', 'женский'),
        allowNull: false,
        validate: {
            isIn: { args: [['мужской', 'женский']], msg: 'Пол должен быть "мужской" или "женский"' }
        }
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Наименование товара обязательно' }
        }
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: { args: [0], msg: 'Стоимость не может быть отрицательной' }
        }
    },
    supplier_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    tableName: 'Clothing',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
});

module.exports = Clothing;