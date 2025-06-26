const EventCategory = require('../models/EventCategory');
const EventService = require('../models/EventService');
const { 
  Restaurant, 
  Alcohol, 
  Flowers, 
  Hotel, 
  Tamada, 
  Program, 
  Transport, 
  Jewelry, 
  Cakes, 
  TraditionalGifts,
  TechnicalEquipmentRental,
  Typography
} = require('../models');

// Маппинг типов услуг к моделям
const serviceModels = {
  'Restaurant': Restaurant,
  'Alcohol': Alcohol,
  'Flowers': Flowers,
  'Hotel': Hotel,
  'Tamada': Tamada,
  'Program': Program,
  'Transport': Transport,
  'Jewelry': Jewelry,
  'Cakes': Cakes,
  'TraditionalGifts': TraditionalGifts,
  'TechnicalEquipmentRental': TechnicalEquipmentRental,
  'Typography': Typography
};

exports.createEventCategory = async (req, res) => {
  console.log('create EventCategory', req.body);
  const { name } = req.body;
  
  try {
    const eventCategory = await EventCategory.create({
      name: name
    });

    res.status(201).json(eventCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEventCategories = async (req, res) => {
  console.log('GetAllEventCategories started!');
  
  try {
    const eventCategories = await EventCategory.findAll({
      include: [{
        model: EventService,
        attributes: ['serviceId', 'serviceType']
      }]
    });
    res.status(200).json(eventCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventCategoryById = async (req, res) => {
  const { id } = req.params;
  console.log('id from params = ', id);

  try {
    const eventCategory = await EventCategory.findByPk(id, {
      include: [{
        model: EventService,
        attributes: ['serviceId', 'serviceType']
      }]
    });

    if (!eventCategory) {
      return res.status(404).json({ message: 'Категория мероприятия с данным id не найдена' });
    }

    res.status(200).json(eventCategory);
  } catch (error) {
    console.error('Ошибка при получении категории мероприятия:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getEventCategoryWithServices = async (req, res) => {
  const { id } = req.params;
  console.log('getEventCategoryWithServices for id = ', id);

  try {
    const eventCategory = await EventCategory.findByPk(id, {
      include: [{
        model: EventService,
        attributes: ['serviceId', 'serviceType']
      }]
    });

    if (!eventCategory) {
      return res.status(404).json({ message: 'Категория мероприятия с данным id не найдена' });
    }

    // Получаем детальную информацию о каждой услуге
    const servicesWithDetails = await Promise.all(
      eventCategory.EventServices.map(async (eventService) => {
        const ServiceModel = serviceModels[eventService.serviceType];
        if (ServiceModel) {
          const serviceDetails = await ServiceModel.findByPk(eventService.serviceId);
          return {
            serviceType: eventService.serviceType,
            serviceId: eventService.serviceId,
            serviceDetails: serviceDetails
          };
        }
        return {
          serviceType: eventService.serviceType,
          serviceId: eventService.serviceId,
          serviceDetails: null
        };
      })
    );

    res.status(200).json({
      id: eventCategory.id,
      name: eventCategory.name,
      services: servicesWithDetails
    });
  } catch (error) {
    console.error('Ошибка при получении категории мероприятия с услугами:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateEventCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Обязательное поле: name' });
  }

  console.log('ID категории мероприятия для обновления:', id);
  console.log('Данные для обновления:', req.body);

  try {
    const eventCategory = await EventCategory.findByPk(id);
    if (!eventCategory) {
      return res.status(404).json({ message: 'Категория мероприятия с указанным ID не найдена' });
    }

    await eventCategory.update({
      name
    });

    console.log('Обновлённая категория мероприятия:', eventCategory);
    res.status(200).json({
      message: 'Категория мероприятия успешно обновлена',
      eventCategory: eventCategory,
    });
  } catch (error) {
    console.error('Ошибка при обновлении категории мероприятия:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEventCategory = async (req, res) => {
  const { id } = req.params;
  try {
    // Сначала удаляем связанные услуги
    await EventService.destroy({ where: { eventCategoryId: id } });
    // Затем удаляем категорию
    const deleted = await EventCategory.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    res.status(404).json({ error: 'EventCategory not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addServiceToCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { serviceId, serviceType } = req.body;

  if (!serviceId || !serviceType) {
    return res.status(400).json({ message: 'Обязательные поля: serviceId, serviceType' });
  }

  try {
    // Проверяем существование категории
    const eventCategory = await EventCategory.findByPk(categoryId);
    if (!eventCategory) {
      return res.status(404).json({ message: 'Категория мероприятия не найдена' });
    }

    // Проверяем, что такой тип услуги существует
    if (!serviceModels[serviceType]) {
      return res.status(400).json({ message: 'Неизвестный тип услуги' });
    }

    // Проверяем существование услуги
    const ServiceModel = serviceModels[serviceType];
    const service = await ServiceModel.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Услуга не найдена' });
    }

    // Создаем связь
    const eventService = await EventService.create({
      eventCategoryId: categoryId,
      serviceId: serviceId,
      serviceType: serviceType
    });

    res.status(201).json({
      message: 'Услуга успешно добавлена к категории',
      eventService: eventService
    });
  } catch (error) {
    console.error('Ошибка при добавлении услуги к категории:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.removeServiceFromCategory = async (req, res) => {
  const { categoryId, serviceId } = req.params;
  const { serviceType } = req.body;

  try {
    const deleted = await EventService.destroy({
      where: { 
        eventCategoryId: categoryId,
        serviceId: serviceId,
        serviceType: serviceType
      },
    });
    
    if (deleted) {
      return res.status(204).send();
    }
    res.status(404).json({ error: 'Связь между категорией и услугой не найдена' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

