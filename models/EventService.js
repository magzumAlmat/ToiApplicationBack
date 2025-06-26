const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EventService = sequelize.define("EventService", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  eventCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "event_categories", // table name
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  serviceType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "event_services",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  defaultScope: {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  },
});

module.exports = EventService;

