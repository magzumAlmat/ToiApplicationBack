const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tamada = sequelize.define('Tamada', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    portfolio: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: { msg: 'Портфолио обязательно' } }
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: { args: [0], msg: 'Стоимость не может быть отрицательной' } }
    }
}, {
    tableName: 'Tamada',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    defaultScope: { attributes: { exclude: ['createdAt', 'updatedAt'] } }
});

module.exports = Tamada;