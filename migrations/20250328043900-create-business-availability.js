// migrations/20250328124500-create-business-availability.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('business_availability', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'restaurants', // Имя таблицы, на которую ссылаемся (обратите внимание на регистр)
          key: 'id',
        },
        onDelete: 'CASCADE', // Удаление записей при удалении ресторана
        onUpdate: 'CASCADE', // Обновление ссылки при изменении ID ресторана
      },
      date: {
        type: Sequelize.DATEONLY, // Только дата без времени
        allowNull: false,
      },
      isBooked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, // По умолчанию день занят
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Текущая дата и время
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Текущая дата и время
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('business_availability');
  },
};