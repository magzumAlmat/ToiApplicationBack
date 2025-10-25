module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Files", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mimetype: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      restaurant_id: {
        type: Sequelize.INTEGER, // Изменено на INTEGER
        references: { model: "restaurants", key: "id" }, // Исправлено имя таблицы
        allowNull: true,
      },
      clothing_id: {
        type: Sequelize.INTEGER,
        references: { model: "clothings", key: "id" }, // Уже правильно
        allowNull: true,
      },
      tamada_id: {
        type: Sequelize.INTEGER, // Предполагаем INTEGER
        references: { model: "Tamada", key: "id" },
        allowNull: true,
      },
      program_id: {
        type: Sequelize.INTEGER, // Предполагаем INTEGER
        references: { model: "Programs", key: "id" },
        allowNull: true,
      },
      traditional_gift_id: {
        type: Sequelize.INTEGER, // Предполагаем INTEGER
        references: { model: "TraditionalGifts", key: "id" },
        allowNull: true,
      },
      jewelry_id: {
        type: Sequelize.INTEGER, // Предполагаем INTEGER
        references: { model: "Jewelry", key: "id" },
        allowNull: true,
      },
      flowers_id: {
        type: Sequelize.INTEGER, // Предполагаем INTEGER
        references: { model: "Flowers", key: "id" },
        allowNull: true,
      },
      cake_id: {
        type: Sequelize.INTEGER, // Предполагаем INTEGER
        references: { model: "Cakes", key: "id" },
        allowNull: true,
      },
      alcohol_id: {
        type: Sequelize.INTEGER, // Предполагаем INTEGER
        references: { model: "Alcohol", key: "id" },
        allowNull: true,
      },
      transport_id: {
        type: Sequelize.INTEGER, // Предполагаем INTEGER
        references: { model: "Transport", key: "id" },
        allowNull: true,
      },
      goods_id: {
        type: Sequelize.INTEGER, // Предполагаем INTEGER
        references: { model: 'Goods',
          key: 'id' },
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Files");
  },
};