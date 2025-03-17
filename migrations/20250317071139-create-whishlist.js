'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Wishlist', {
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
      item_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_reserved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      reserved_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      reserved_by_unknown: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
    await queryInterface.addIndex('Wishlist', ['wedding_id']);
    await queryInterface.addIndex('Wishlist', ['reserved_by']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Wishlist');
  },
};