// models/index.js


// Создание экземпляра Sequelize
const sequelize = require('../config/db')
const Restaurant = require('./Restaurant');
const BusinessAvailability = require('./BuisnessAvailable');
const Wedding = require('./Wedding');
// Экспортируем объект с sequelize сразу, чтобы избежать циклической зависимости
const db = {
  sequelize,
 
};

// Импорт моделей после создания sequelize
db.User = require('../auth/models/User');
db.Wedding = require('./Wedding');
db.WeddingItem = require('./WeddingItem');
db.Wishlist = require('./Whishlist');

// Определение связей между моделями
db.User.hasMany(db.Wedding, { foreignKey: 'host_id', onDelete: 'CASCADE' });
db.Wedding.belongsTo(db.User, { foreignKey: 'host_id' });

db.Wedding.hasMany(db.WeddingItem, { foreignKey: 'wedding_id', onDelete: 'CASCADE' });
db.WeddingItem.belongsTo(db.Wedding, { foreignKey: 'wedding_id' });

db.Wedding.hasMany(db.Wishlist, { foreignKey: 'wedding_id', onDelete: 'CASCADE' });
db.Wishlist.belongsTo(db.Wedding, { foreignKey: 'wedding_id' });

db.User.hasMany(db.Wishlist, { foreignKey: 'reserved_by', onDelete: 'SET NULL' });
db.Wishlist.belongsTo(db.User, { foreignKey: 'reserved_by', as: 'Reserver' });


Restaurant.hasMany(BusinessAvailability, { foreignKey: 'restaurantId' });
BusinessAvailability.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

module.exports = {db,Restaurant,
  BusinessAvailability,
  Wedding,};

// Проверка подключения
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();