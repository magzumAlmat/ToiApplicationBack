const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Alcohol = sequelize.define('Alcohol', {
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
    alcoholName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Наименование алкоголя обязательно' } }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Укажите категорию алкоголя' } }
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: { args: [0], msg: 'Стоимость не может быть отрицательной' } }
    },
    supplier_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    tableName: 'Alcohol',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    defaultScope: { attributes: { exclude: ['createdAt', 'updatedAt'] } }
});

module.exports = Alcohol;