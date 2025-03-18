// models/File.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Restaurant = require("./Restaurant");
const Clothing = require("./Clothing");
const Tamada = require("./Tamada");
const Program = require("./Program");
const TraditionalGift = require("./TraditionalGifts");
const Flowers = require("./Flowers");
const Cake = require("./Cakes");
const Alcohol = require("./Alcohol");
const Transport = require("./Transport");
const Goods=require('./Goods')
const File = sequelize.define("File", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
},
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "restaurants",
      key: "id",
    },
    allowNull: true,
  },
  clothing_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "clothings",
      key: "id",
    },
    allowNull: true,
  },
  tamada_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "tamadas",
      key: "id",
    },
    allowNull: true,
  },
  program_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "programs",
      key: "id",
    },
    allowNull: true,
  },
  traditional_gift_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "traditional_gifts",
      key: "id",
    },
    allowNull: true,
  },
  flowers_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "flowers",
      key: "id",
    },
    allowNull: true,
  },
  cake_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "cakes",
      key: "id",
    },
    allowNull: true,
  },
  alcohol_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "alcohols",
      key: "id",
    },
    allowNull: true,
  },
  transport_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "transports",
      key: "id",
    },
    allowNull: true,
  },
  goods_id: { // Новое поле
    type: DataTypes.INTEGER,
    references: {
      model: "Goods",
      key: "id",
    },
    allowNull: true,
  },
});

// Устанавливаем связи "многие к одному"
File.belongsTo(Restaurant, { foreignKey: "restaurant_id", as: "restaurant" });
File.belongsTo(Clothing, { foreignKey: "clothing_id", as: "clothing" });
File.belongsTo(Tamada, { foreignKey: "tamada_id", as: "tamada" });
File.belongsTo(Program, { foreignKey: "program_id", as: "program" });
File.belongsTo(TraditionalGift, { foreignKey: "traditional_gift_id", as: "traditionalGift" });
File.belongsTo(Flowers, { foreignKey: "flowers_id", as: "flowers" });
File.belongsTo(Cake, { foreignKey: "cake_id", as: "cake" });
File.belongsTo(Alcohol, { foreignKey: "alcohol_id", as: "alcohol" });
File.belongsTo(Transport, { foreignKey: "transport_id", as: "transport" });
File.belongsTo(Goods, { foreignKey: "goods_id", as: "goods" }); // Новая связь
module.exports = File;