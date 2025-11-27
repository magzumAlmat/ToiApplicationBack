// const { DataTypes } = require('sequelize');
// // const db = require('./index');
// const sequelize = require('../config/db')

// const Wishlist = sequelize.define('Wishlist', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   wedding_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Weddings',
//       key: 'id',
//     },
//   },
//   item_name: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   is_reserved: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   },
//   reserved_by: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     references: {
//       model: 'Users',
//       key: 'id',
//     },
//   },
//   reserved_by_unknown: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
//   created_at: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: sequelize.fn('NOW'),
//   },
//   updated_at: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: sequelize.fn('NOW'),
//   },

  
// }, {
//   tableName: 'Wishlist',
//   timestamps: false,
// });

// module.exports = Wishlist;



// models/Wishlist.js


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Wishlist = sequelize.define('Wishlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  event_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  good_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Goods',
      key: 'id',
    },
  },
  item_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
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
  reserved_by_unknown: {
    type: DataTypes.STRING(255),
    allowNull: true,
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

// Define associations
const Goods = require('./Goods');
const User = require('./User'); // Assuming User model path

Wishlist.belongsTo(Goods, { foreignKey: 'good_id', as: 'Good' });
Goods.hasMany(Wishlist, { foreignKey: 'good_id' });

Wishlist.belongsTo(User, { foreignKey: 'reserved_by', as: 'Reserver' });
User.hasMany(Wishlist, { foreignKey: 'reserved_by' });

module.exports = Wishlist;