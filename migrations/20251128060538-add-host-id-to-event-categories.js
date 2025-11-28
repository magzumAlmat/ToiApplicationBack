// migrations/YYYYMMDDHHMMSS-add-host-id-to-event-categories.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('event_categories', 'host_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Сначала nullable для существующих записей
      references: {
        model: 'Users',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('event_categories', 'host_id');
  }
};