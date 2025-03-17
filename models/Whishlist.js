const { DataTypes } = require('sequelize');
// const db = require('./index');
const sequelize = require('../config/db')

const Wishlist = sequelize.define('Wishlist', {
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
  item_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_reserved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  reserved_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id',
    },
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
  tableName: 'Wishlist',
  timestamps: false,
});

module.exports = Wishlist;