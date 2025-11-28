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



exports.addServicesToCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { service_ids } = req.body;

  if (!Array.isArray(service_ids) || service_ids.length === 0) {
    return res.status(400).json({ message: 'Поле service_ids должно быть непустым массивом' });
  }

  try {
    const eventCategory = await EventCategory.findByPk(categoryId);
    if (!eventCategory) {
      return res.status(404).json({ message: 'Категория мероприятия не найдена' });
    }

    const services = await Promise.all(
      service_ids.map(async ({ serviceId, serviceType }) => {
        if (!serviceModels[serviceType]) {
          throw new Error(`Неизвестный тип услуги: ${serviceType}`);
        }
        const ServiceModel = serviceModels[serviceType];
        const service = await ServiceModel.findByPk(serviceId);
        if (!service) {
          throw new Error(`Услуга не найдена: ${serviceId}`);
        }
        return { serviceId, serviceType };
      })
    );

    const eventServices = await EventService.bulkCreate(
      services.map(({ serviceId, serviceType }) => ({
        eventCategoryId: categoryId,
        serviceId,
        serviceType,
      }))
    );

    res.status(201).json({
      message: 'Услуги успешно добавлены к категории',
      eventServices,
    });
  } catch (error) {
    console.error('Ошибка при добавлении услуг к категории:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateServicesForCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { service_ids } = req.body;

  if (!Array.isArray(service_ids)) {
    return res.status(400).json({ message: 'Поле service_ids должно быть массивом' });
  }

  try {
    const eventCategory = await EventCategory.findByPk(categoryId);
    if (!eventCategory) {
      return res.status(404).json({ message: 'Категория мероприятия не найдена' });
    }

    // Удаляем существующие связи
    await EventService.destroy({ where: { eventCategoryId: categoryId } });

    // Добавляем новые связи, если service_ids не пустой
    if (service_ids.length > 0) {
      const services = await Promise.all(
        service_ids.map(async ({ serviceId, serviceType }) => {
          if (!serviceModels[serviceType]) {
            throw new Error(`Неизвестный тип услуги: ${serviceType}`);
          }
          const ServiceModel = serviceModels[serviceType];
          const service = await ServiceModel.findByPk(serviceId);
          if (!service) {
            throw new Error(`Услуга не найдена: ${serviceId}`);
          }
          return { serviceId, serviceType };
        })
      );

      await EventService.bulkCreate(
        services.map(({ serviceId, serviceType }) => ({
          eventCategoryId: categoryId,
          serviceId,
          serviceType,
        }))
      );
    }

    res.status(200).json({ message: 'Услуги для категории успешно обновлены' });
  } catch (error) {
    console.error('Ошибка при обновлении услуг для категории:', error);
    res.status(500).json({ error: error.message });
  }
};



// exports.getAllServices = async (req, res) => {
//   console.log('GetAllServices started!');

//   try {
//     const services = await Promise.all(
//       Object.entries(serviceModels).map(async ([serviceType, Model]) => {
//         const items = await Model.findAll({
//           attributes: ['id', 'name', 'description'], // Adjust fields based on model schema
//         });
//         return items.map(item => ({
//           id: item.id,
//           name: item.name || 'Unnamed', // Fallback if name is missing
//           description: item.description || '',
//           serviceType,
//         }));
//       })
//     );

//     // Flatten the array of arrays and sort by name
//     const allServices = services.flat().sort((a, b) => a.name.localeCompare(b.name));

//     res.status(200).json({ success: true, data: allServices });
//   } catch (error) {
//     console.error('Ошибка при получении всех услуг:', error);
//     res.status(500).json({ error: error.message });
//   }
// };


exports.getAllServices = async (req, res) => {
  console.log('GetAllServices started!');

  try {
    const services = await Promise.all(
      Object.entries(serviceModels).map(async ([serviceType, Model]) => {
        try {
          // Dynamically check available columns in the model
          const attributes = ['id', 'name'];
          if (Model.rawAttributes.description) {
            attributes.push('description');
          }
          
          const items = await Model.findAll({
            attributes,
            raw: true, // Return plain objects for easier manipulation
          });

          return items.map(item => ({
            id: item.id,
            name: item.name || 'Unnamed', // Fallback for missing name

            serviceType,
          }));
        } catch (error) {
          console.error(`Error fetching services for ${serviceType}:`, error.message);
          return []; // Return empty array for this service type to continue processing others
        }
      })
    );

    // Flatten the array of arrays and sort by name
    const allServices = services.flat().sort((a, b) => a.name.localeCompare(b.name));

    if (allServices.length === 0) {
      console.warn('No services found across all models');
      return res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json({ success: true, data: allServices });
  } catch (error) {
    console.error('Unexpected error in getAllServices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// exports.createEventCategory = async (req, res) => {
//   const { name, total_cost, paid_amount, remaining_balance } = req.body;
//   try {
//     const eventCategory = await EventCategory.create({
//       name,
//       total_cost: total_cost || 0,
//       paid_amount: paid_amount || 0,
//       remaining_balance: remaining_balance || 0,
//     });
//     res.status(201).json(eventCategory);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


exports.createEventCategory = async (req, res) => {
  const { name, total_cost, paid_amount, remaining_balance } = req.body;
  const userId = req.user?.id;
  
  // Проверяем наличие userId
  if (!userId) {
    return res.status(401).json({ 
      success: false, 
      error: 'User authentication required' 
    });
  }
  
  try {
    const eventCategory = await EventCategory.create({
      name,
      host_id: userId,
      total_cost: total_cost || 0,
      paid_amount: paid_amount || 0,
      remaining_balance: remaining_balance || 0,
    });
    res.status(201).json({ 
      success: true, 
      data: eventCategory 
    });
  } catch (error) {
    console.error('Error creating event category:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
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
    console.log('1 Забираем все категории мероприятия- ',eventCategories)
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

// exports.getEventCategoryWithServices = async (req, res) => {
//   const { id } = req.params;
//   console.log('getEventCategoryWithServices for id = ', id);

//   try {
//     const eventCategory = await EventCategory.findByPk(id, {
//       include: [{
//         model: EventService,
//         attributes: ['serviceId', 'serviceType']
//       }]
//     });

//     if (!eventCategory) {
//       return res.status(404).json({ message: 'Категория мероприятия с данным id не найдена' });
//     }

//     // Получаем детальную информацию о каждой услуге
//     const servicesWithDetails = await Promise.all(
//       eventCategory.EventServices.map(async (eventService) => {
//         const ServiceModel = serviceModels[eventService.serviceType];
//         if (ServiceModel) {
//           const serviceDetails = await ServiceModel.findByPk(eventService.serviceId);
//           return {
//             serviceType: eventService.serviceType,
//             serviceId: eventService.serviceId,
//             serviceDetails: serviceDetails
//           };
//         }
//         return {
//           serviceType: eventService.serviceType,
//           serviceId: eventService.serviceId,
//           serviceDetails: null
//         };
//       })
//     );

//     res.status(200).json({
//       id: eventCategory.id,
//       name: eventCategory.name,
//       services: servicesWithDetails
//     });
//   } catch (error) {
//     console.error('Ошибка при получении категории мероприятия с услугами:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getEventCategoryWithServices = async (req, res) => {
//        try {
//          const { id } = req.params;
//          const category = await EventCategory.findByPk(id);
//          if (!category) {
//            return res.status(404).json({ error: 'Category not found' });
//          }

//          const eventServices = await EventService.findAll({
//            where: { eventCategoryId: id },
//            raw: true,
//          });

//          const services = await Promise.all(
//            eventServices.map(async (es) => {
//              try {
//                const Model = serviceModels[es.serviceType];
//                if (!Model) {
//                  console.warn(`No model found for serviceType: ${es.serviceType}`);
//                  return null;
//                }
//                const attributes = ['id', 'name'];
//                if (Model.rawAttributes.description) {
//                  attributes.push('description');
//                }
//                const service = await Model.findByPk(es.serviceId, {
//                  attributes,
//                  raw: true,
//                });
//                return service ? { ...service, serviceType: es.serviceType, serviceId: es.serviceId } : null;
//              } catch (error) {
//                console.error(`Error fetching service ${es.serviceType}/${es.serviceId}:`, error.message);
//                return null;
//              }
//            })
//          );

//          res.status(200).json({
//            success: true,
//            data: {
//              ...category.dataValues,
//              services: services.filter(s => s !== null),
//            },
//          });
//        } catch (error) {
//          console.error('Error in getEventCategoryWithServices:', error);
//          res.status(500).json({ error: 'Internal server error' });
//        }
//      };


exports.getEventCategoryWithServices = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await EventCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const eventServices = await EventService.findAll({
      where: { eventCategoryId: id },
      raw: true,
    });

    const services = await Promise.all(
      eventServices.map(async (es) => {
        try {
          const Model = serviceModels[es.serviceType];
          if (!Model) {
            console.warn(`No model found for serviceType: ${es.serviceType}`);
            return null;
          }
          const service = await Model.findByPk(es.serviceId, {
            attributes: ['id', 'name'],
            raw: true,
          });
          return service ? { ...service, serviceType: es.serviceType, serviceId: es.serviceId } : null;
        } catch (error) {
          console.error(`Error fetching service ${es.serviceType}/${es.serviceId}:`, error.message);
          return null;
        }
      })
    );

    res.status(200).json({
      success: true,
      data: {
        ...category.dataValues,
        services: services.filter(s => s !== null),
      },
    });
  } catch (error) {
    console.error('Error in getEventCategoryWithServices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.updateEventCategory = async (req, res) => {
  const { id } = req.params;
  const { name, total_cost, paid_amount, remaining_balance } = req.body;
  try {
    const eventCategory = await EventCategory.findByPk(id);
    if (!eventCategory) {
      return res.status(404).json({ message: 'Категория мероприятия с указанным ID не найдена' });
    }
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (total_cost !== undefined) updateData.total_cost = total_cost;
    if (paid_amount !== undefined) updateData.paid_amount = paid_amount;
    if (remaining_balance !== undefined) updateData.remaining_balance = remaining_balance;

    await eventCategory.update(updateData);
    res.status(200).json({
      message: 'Категория мероприятия успешно обновлена',
      eventCategory: eventCategory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteEventCategory = async (req, res) => {
  const { id } = req.params;
  console.log('deleteEventCategory started    id= ',id)
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

exports.updateTotalCost = async (req, res) => {
  const { id } = req.params;
  const { total_cost } = req.body;

  if (total_cost === undefined) {
    return res.status(400).json({ success: false, error: 'Поле total_cost обязательно' });
  }

  try {
    const eventCategory = await EventCategory.findByPk(id);
    if (!eventCategory) {
      return res.status(404).json({ success: false, error: 'Категория мероприятия не найдена' });
    }

    await eventCategory.update({ total_cost });

    res.status(200).json({
      success: true,
      data: eventCategory,
      message: 'Общая сумма обновлена',
    });
  } catch (error) {
    console.error('Ошибка при обновлении общей суммы:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

exports.updatePaidAmount = async (req, res) => {
  const { id } = req.params;
  const { paid_amount } = req.body;

  if (paid_amount === undefined) {
    return res.status(400).json({ success: false, error: 'Поле paid_amount обязательно' });
  }

  try {
    const eventCategory = await EventCategory.findByPk(id);
    if (!eventCategory) {
      return res.status(404).json({ success: false, error: 'Категория мероприятия не найдена' });
    }

    await eventCategory.update({ paid_amount });

    res.status(200).json({
      success: true,
      data: eventCategory,
      message: 'Потраченная сумма обновлена',
    });
  } catch (error) {
    console.error('Ошибка при обновлении потраченной суммы:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

exports.updateRemainingBalance = async (req, res) => {
  const { id } = req.params;
  const { remaining_balance } = req.body;

  if (remaining_balance === undefined) {
    return res.status(400).json({ success: false, error: 'Поле remaining_balance обязательно' });
  }

  try {
    const eventCategory = await EventCategory.findByPk(id);
    if (!eventCategory) {
      return res.status(404).json({ success: false, error: 'Категория мероприятия не найдена' });
    }

    await eventCategory.update({ remaining_balance });

    res.status(200).json({
      success: true,
      data: eventCategory,
      message: 'Остаток обновлен',
    });
  } catch (error) {
    console.error('Ошибка при обновлении остатка:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

