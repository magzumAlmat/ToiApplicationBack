// models/Wedding.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')
const db = require('./index'); // Импорт db из index.js

const Wedding = sequelize.define('Wedding', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  host_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  total_cost: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  paid_amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  remaining_balance: {
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
  tableName: 'Weddings',
  timestamps: false, // Автоматические createdAt и updatedAt
});

Wedding.associate = function(models) {
  Wedding.belongsTo(models.User, { foreignKey: 'host_id' });
  Wedding.hasMany(models.WeddingItem, { foreignKey: 'wedding_id', onDelete: 'CASCADE' });
  Wedding.hasMany(models.Wishlist, { foreignKey: 'wedding_id', onDelete: 'CASCADE' });
};


module.exports = Wedding;