// migrations/20250610012802-create-hotels.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("hotels", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING, allowNull: false },
      averageCheck: { type: Sequelize.FLOAT, allowNull: false },
      phone: { type: Sequelize.STRING, allowNull: false },
      link: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("hotels");
  },
};

