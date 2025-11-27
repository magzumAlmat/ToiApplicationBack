// models/index.js


// Создание экземпляра Sequelize
const sequelize = require('../config/db')
const Restaurant = require('./Restaurant');
const BusinessAvailability = require('./BuisnessAvailable');
const Wedding = require('./Wedding');
const TechnicalEquipmentRental = require('./TechnicalEquipmentRental');
const Typography = require('./Typography');
const Hotel = require('./Hotel');
const EventCategory = require('./EventCategory');
const EventService = require('./EventService');
const Alcohol = require('./Alcohol');
const Flowers = require('./Flowers');
const Tamada = require('./Tamada');
const Program = require('./Program');
const Transport = require('./Transport');
const Jewelry = require('./Jewelry');
const Cakes = require('./Cakes');
const TraditionalGifts = require('./TraditionalGifts');
const Suvenirs = require('./Suvenirs');

// Экспортируем объект с sequelize сразу, чтобы избежать циклической зависимости
const db = {
  sequelize,
 
};

// Импорт моделей после создания sequelize
db.User = require('../auth/models/User');
db.Wedding = require('./Wedding');
db.WeddingItem = require('./WeddingItem');
db.Wishlist = require('./Whishlist');
db.Goods = require('./Goods'); // Add this line

// Определение связей между моделями
db.User.hasMany(db.Wedding, { foreignKey: 'host_id', onDelete: 'CASCADE' });
db.Wedding.belongsTo(db.User, { foreignKey: 'host_id' });

db.Wedding.hasMany(db.WeddingItem, { foreignKey: 'wedding_id', onDelete: 'CASCADE' });
db.WeddingItem.belongsTo(db.Wedding, { foreignKey: 'wedding_id' });

db.Wedding.hasMany(db.Wishlist, { foreignKey: 'wedding_id', onDelete: 'CASCADE' });
db.Wishlist.belongsTo(db.Wedding, { foreignKey: 'wedding_id' });

db.User.hasMany(db.Wishlist, { foreignKey: 'reserved_by', onDelete: 'SET NULL' });
db.Wishlist.belongsTo(db.User, { foreignKey: 'reserved_by', as: 'Reserver' });

db.Wishlist.belongsTo(db.Goods, { foreignKey: 'good_id', as: 'Good' }); // Add this line
db.Goods.hasMany(db.Wishlist, { foreignKey: 'good_id' }); // Add this line

Restaurant.hasMany(BusinessAvailability, { foreignKey: 'restaurantId' });
BusinessAvailability.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

// Связи для EventCategory и EventService
EventCategory.hasMany(EventService, { foreignKey: 'eventCategoryId', onDelete: 'CASCADE' });
EventService.belongsTo(EventCategory, { foreignKey: 'eventCategoryId' });

module.exports = {
  db,
  Restaurant,
  BusinessAvailability,
  Wedding,
  TechnicalEquipmentRental,
  Typography,
  Hotel,
  EventCategory,
  EventService,
  Alcohol,
  Flowers,
  Tamada,
  Program,
  Transport,
  Jewelry,
  Cakes,
  TraditionalGifts,
  Suvenirs
};

// Проверка подключения
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();