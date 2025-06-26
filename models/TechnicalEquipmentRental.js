const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TechnicalEquipmentRental = sequelize.define('TechnicalEquipmentRental', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Наименование компании обязательно'
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Телефон обязателен'
            }
        }
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: {
                msg: 'Некорректная ссылка'
            }
        }
    }
}, {
    tableName: "technical_equipment_rentals",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
});

module.exports = TechnicalEquipmentRental;

