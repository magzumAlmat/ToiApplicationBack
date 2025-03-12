"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Alcohol", [
      {
        salonName: "Винный мир",
        address: "ул. Абая 12",
        phone: "+7 (777) 123-45-67",
        district: "Алмалинский",
        alcoholName: "Вино красное",
        category: "Вино",
        cost: 5000,
        supplier_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        salonName: "АлкоShop",
        address: "пр. Райымбека 45",
        phone: "+7 (701) 234-56-78",
        district: "Бостандыкский",
        alcoholName: "Водка премиум",
        category: "Водка",
        cost: 3000,
        supplier_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Cakes", [
      {
        name: "Тортовая лавка",
        address: "ул. Гоголя 10",
        phone: "+7 (727) 345-67-89",
        district: "Медеуский",
        cakeType: "Шоколадный",
        cost: 7000,
        supplier_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Сладкий уголок",
        address: "ул. Жандосова 25",
        phone: "+7 (708) 456-78-90",
        district: "Ауэзовский",
        cakeType: "Фруктовый",
        cost: 6000,
        supplier_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Clothing", [
      {
        storeName: "Модный бутик",
        address: "ул. Фурманова 5",
        phone: "+7 (705) 567-89-01",
        district: "Алмалинский",
        gender: "женский",
        itemName: "Платье вечернее",
        cost: 15000,
        supplier_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storeName: "Мужской стиль",
        address: "пр. Сейфуллина 15",
        phone: "+7 (777) 678-90-12",
        district: "Бостандыкский",
        gender: "мужской",
        itemName: "Костюм",
        cost: 25000,
        supplier_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Flowers", [
      {
        salonName: "Цветочный рай",
        address: "ул. Толе би 20",
        phone: "+7 (701) 789-01-23",
        district: "Медеуский",
        flowerName: "Розы",
        flowerType: "Букет",
        cost: 4000,
        supplier_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        salonName: "Флора",
        address: "ул. Шевченко 30",
        phone: "+7 (727) 890-12-34",
        district: "Алмалинский",
        flowerName: "Тюльпаны",
        flowerType: "Композиция",
        cost: 3500,
        supplier_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Programs", [
      {
        teamName: "Веселые ребята",
        cost: 20000,
        type: "Шоу-программа",
        supplier_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamName: "Танцевальный дуэт",
        cost: 15000,
        type: "Танцы",
        supplier_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);


    await queryInterface.bulkInsert("Restaurants", [
      {
        name: "Вкусный уголок",
        capacity: "50 человек",
        cuisine: "Европейская",
        averageCost: 5000,
        address: "ул. Абылай хана 10",
        phone: "+7 (777) 901-23-45",
        district: "Медеуский",
        supplier_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Азия",
        capacity: "80 человек",
        cuisine: "Азиатская",
        averageCost: 6000,
        address: "пр. Достык 25",
        phone: "+7 (705) 012-34-56",
        district: "Бостандыкский",
        supplier_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Tamada", [
      {
        name: "Айдар Жумабаев",
        portfolio: "Ведущий свадеб и корпоративов, опыт 5 лет",
        cost: 30000,
        supplier_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Гульнара Алиева",
        portfolio: "Тамада с юмором, опыт 7 лет",
        cost: 35000,
        supplier_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("TraditionalGifts", [
      {
        salonName: "Подарки Востока",
        address: "ул. Жибек Жолы 15",
        phone: "+7 (727) 123-45-67",
        district: "Алмалинский",
        itemName: "Чайный набор",
        type: "Традиционный",
        cost: 8000,
        supplier_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        salonName: "Сувениры Алматы",
        address: "ул. Сатпаева 20",
        phone: "+7 (701) 234-56-78",
        district: "Бостандыкский",
        itemName: "Ковер ручной работы",
        type: "Декоративный",
        cost: 15000,
        supplier_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Transport", [
      {
        salonName: "АвтоПрокат",
        address: "ул. Байзакова 10",
        phone: "+7 (777) 345-67-89",
        district: "Медеуский",
        carName: "Toyota Camry",
        color: "Черный",
        brand: "Toyota",
        cost: 20000,
        supplier_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        salonName: "Lux Cars",
        address: "пр. Аль-Фараби 5",
        phone: "+7 (705) 456-78-90",
        district: "Бостандыкский",
        carName: "Mercedes S-Class",
        color: "Белый",
        brand: "Mercedes",
        cost: 35000,
        supplier_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Alcohol", null, {});
    await queryInterface.bulkDelete("Cakes", null, {});
    await queryInterface.bulkDelete("Clothing", null, {});
    await queryInterface.bulkDelete("Flowers", null, {});
    await queryInterface.bulkDelete("Programs", null, {});
    
    await queryInterface.bulkDelete("Restaurants", null, {});
    await queryInterface.bulkDelete("Tamada", null, {});
    await queryInterface.bulkDelete("TraditionalGifts", null, {});
    await queryInterface.bulkDelete("Transport", null, {});
  },
};