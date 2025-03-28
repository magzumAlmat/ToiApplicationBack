// models/BusinessAvailability.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BusinessAvailability = sequelize.define('BusinessAvailability', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurants', // Ссылка на таблицу restaurants
      key: 'id',
    },
    onDelete: 'CASCADE', // Удаление записей при удалении ресторана
  },
  date: {
    type: DataTypes.DATEONLY, // Только дата без времени
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Неверный формат даты',
      },
    },
  },
  isBooked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // По умолчанию день занят
  },
}, {
  tableName: 'business_availability',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = BusinessAvailability;