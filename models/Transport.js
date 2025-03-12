const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Transport = sequelize.define('Transport', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    salonName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Наименование салона обязательно' } }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Адрес обязателен' } }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { is: { args: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, msg: 'Неверный формат телефона' } }
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Укажите район или "за пределами Алматы"' } }
    },
    carName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Наименование авто обязательно' } }
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Укажите цвет' } }
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Укажите марку' } }
    }
}, {
    tableName: 'Transport',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    defaultScope: { attributes: { exclude: ['createdAt', 'updatedAt'] } }
});

module.exports = Transport;