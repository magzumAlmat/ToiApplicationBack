// migrations/20250610013000-create-event-categories.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("event_categories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: { 
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("event_categories");
  },
};

