'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WeddingItems', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      wedding_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Weddings',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      item_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      total_cost: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    // Добавление индексов для оптимизации
    await queryInterface.addIndex('WeddingItems', ['wedding_id']);
    await queryInterface.addIndex('WeddingItems', ['item_type']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('WeddingItems');
  },
};