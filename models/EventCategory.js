const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EventCategory = sequelize.define("EventCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "Название категории мероприятия обязательно",
      },
    },
  },
}, {
  tableName: "event_categories",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  defaultScope: {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  },
});

module.exports = EventCategory;

