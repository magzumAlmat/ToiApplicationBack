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
  wedding_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Weddings',
      key: 'id',
    },
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
    allowNull: true, // Опционально, если нужно переопределить имя
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // Опционально, если нужно переопределить описание
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

// Устанавливаем связь
const Goods = require('./Goods');
Wishlist.belongsTo(Goods, { foreignKey: 'good_id' });
Goods.hasMany(Wishlist, { foreignKey: 'good_id' });

module.exports = Wishlist;