const { DataTypes } = require('sequelize');
const db = require('./index');
const sequelize = require('../config/db')
const WeddingItem =sequelize.define('WeddingItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  wedding_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Weddings',
      key: 'id',
    },
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  item_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  total_cost: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0.00,
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
  tableName: 'WeddingItems',
  timestamps: false,
});

module.exports = WeddingItem;