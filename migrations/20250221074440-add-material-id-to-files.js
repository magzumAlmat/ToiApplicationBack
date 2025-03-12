'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Проверяем, существует ли таблица Files
      const tableInfo = await queryInterface.describeTable('Files');
      
      // Если таблица существует, проверяем наличие столбца alcohol_id
      if (!tableInfo.alcohol_id) {
        await queryInterface.addColumn('Files', 'alcohol_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Alcohol', // Ссылка на таблицу Alcohol
            key: 'id', // Ссылка на поле id
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        });
        console.log('Column "alcohol_id" added to "Files" table.');
      } else {
        console.log('Column "alcohol_id" already exists in "Files" table. Skipping...');
      }
    } catch (error) {
      // Если таблица Files не существует
      if (error.message.includes('No description found for "Files" table')) {
        console.error('Error: Table "Files" does not exist. Please ensure the table is created before running this migration.');
        throw new Error('Table "Files" must be created before adding the "alcohol_id" column.');
      }
      throw error; // Пробрасываем другие ошибки
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Проверяем, существует ли таблица Files
      const tableInfo = await queryInterface.describeTable('Files');
      
      // Если столбец alcohol_id существует, удаляем его
      if (tableInfo.alcohol_id) {
        await queryInterface.removeColumn('Files', 'alcohol_id');
        console.log('Column "alcohol_id" removed from "Files" table.');
      } else {
        console.log('Column "alcohol_id" does not exist in "Files" table. Skipping...');
      }
    } catch (error) {
      // Если таблица Files не существует
      if (error.message.includes('No description found for "Files" table')) {
        console.log('Table "Files" does not exist. Nothing to undo.');
        return; // Пропускаем откат, если таблицы нет
      }
      throw error; // Пробрасываем другие ошибки
    }
  },
};