// models/Goods.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Goods = sequelize.define('Goods', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  item_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: { min: { args: [0], msg: 'Стоимость не может быть отрицательной' } }
},
  specs: {
    type: DataTypes.JSON, // JSON для хранения характеристик
    allowNull: true,
    defaultValue: {},
  },
  supplier_id:{
    type: DataTypes.INTEGER,
    allowNull: true
},
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.fn('NOW'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.fn('NOW'),
  },
}, {
  tableName: 'Goods',
  timestamps: false,
});

module.exports = Goods;