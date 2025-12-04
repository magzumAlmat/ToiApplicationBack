const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const EventCategory = sequelize.define("EventCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  host_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'users',
    key: 'id'
  }
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
  budget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: null,
    validate: {
      min: {
        args: [0],
        msg: "Бюджет должен быть положительным числом",
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

