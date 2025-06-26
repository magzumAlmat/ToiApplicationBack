// migrations/20250610013001-create-event-services.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("event_services", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      eventCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "event_categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      serviceType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // Добавляем индексы для оптимизации запросов
    await queryInterface.addIndex("event_services", ["eventCategoryId"]);
    await queryInterface.addIndex("event_services", ["serviceId", "serviceType"]);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("event_services");
  },
};

