// migrations/20250610012800-create-technical-equipment-rentals.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("technical_equipment_rentals", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      companyName: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING, allowNull: false },
      link: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("technical_equipment_rentals");
  },
};

