const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TraditionalGifts = sequelize.define('TraditionalGifts', {
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
    itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Наименование товара обязательно' } }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Укажите вид подарка' } }
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: { args: [0], msg: 'Стоимость не может быть отрицательной' } }
    }
}, {
    tableName: 'TraditionalGifts',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    defaultScope: { attributes: { exclude: ['createdAt', 'updatedAt'] } }
});

module.exports = TraditionalGifts;