// seeders/20250610014000-event-categories-and-services.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Создаем категории мероприятий
    const eventCategories = await queryInterface.bulkInsert('event_categories', [
      {
        name: 'Традиционные семейные торжества',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Корпоративные мероприятия',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Конференции',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Получаем ID созданных категорий
    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM event_categories ORDER BY id',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const traditionalCategory = categories.find(c => c.name === 'Традиционные семейные торжества');
    const corporateCategory = categories.find(c => c.name === 'Корпоративные мероприятия');
    const conferenceCategory = categories.find(c => c.name === 'Конференции');

    // Создаем связи между категориями и услугами
    const eventServices = [];

    // Традиционные семейные торжества
    if (traditionalCategory) {
      eventServices.push(
        { eventCategoryId: traditionalCategory.id, serviceId: 1, serviceType: 'Restaurant', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: traditionalCategory.id, serviceId: 1, serviceType: 'Flowers', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: traditionalCategory.id, serviceId: 1, serviceType: 'Alcohol', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: traditionalCategory.id, serviceId: 1, serviceType: 'Hotel', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: traditionalCategory.id, serviceId: 1, serviceType: 'Tamada', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: traditionalCategory.id, serviceId: 1, serviceType: 'Program', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: traditionalCategory.id, serviceId: 1, serviceType: 'Transport', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: traditionalCategory.id, serviceId: 1, serviceType: 'Jewelry', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: traditionalCategory.id, serviceId: 1, serviceType: 'Cakes', createdAt: new Date(), updatedAt: new Date() }
      );
    }

    // Корпоративные мероприятия
    if (corporateCategory) {
      eventServices.push(
        { eventCategoryId: corporateCategory.id, serviceId: 1, serviceType: 'Transport', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: corporateCategory.id, serviceId: 1, serviceType: 'Restaurant', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: corporateCategory.id, serviceId: 1, serviceType: 'TraditionalGifts', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: corporateCategory.id, serviceId: 1, serviceType: 'Alcohol', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: corporateCategory.id, serviceId: 1, serviceType: 'Cakes', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: corporateCategory.id, serviceId: 1, serviceType: 'Tamada', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: corporateCategory.id, serviceId: 1, serviceType: 'Program', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: corporateCategory.id, serviceId: 1, serviceType: 'TechnicalEquipmentRental', createdAt: new Date(), updatedAt: new Date() }
      );
    }

    // Конференции
    if (conferenceCategory) {
      eventServices.push(
        { eventCategoryId: conferenceCategory.id, serviceId: 1, serviceType: 'Hotel', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: conferenceCategory.id, serviceId: 1, serviceType: 'TechnicalEquipmentRental', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: conferenceCategory.id, serviceId: 1, serviceType: 'Tamada', createdAt: new Date(), updatedAt: new Date() },
        { eventCategoryId: conferenceCategory.id, serviceId: 1, serviceType: 'Typography', createdAt: new Date(), updatedAt: new Date() }
      );
    }

    // Вставляем связи
    if (eventServices.length > 0) {
      await queryInterface.bulkInsert('event_services', eventServices);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Удаляем связи
    await queryInterface.bulkDelete('event_services', null, {});
    
    // Удаляем категории
    await queryInterface.bulkDelete('event_categories', null, {});
  }
};

