'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Jewelry', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            storeName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: { notEmpty: true }
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: { notEmpty: true }
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: { is: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/ }
            },
            district: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: { notEmpty: true }
            },
            itemName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: { notEmpty: true }
            },
            material: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: { notEmpty: true }
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
              },
            cost: {
                type: Sequelize.FLOAT,
                allowNull: false,
                validate: { min: 0 }
            },
            supplier_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Jewelry');
    }
};