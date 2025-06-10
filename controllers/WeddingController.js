const { Wedding,BusinessAvailability} = require('../models');
const WeddingItem =require('../models/WeddingItem')
// const BusinessAvailability=require('../models/BuisnessAvailable')
// Создание новой свадьбы (Create)
const createWedding = async (req, res) => {
  const { name, date, items } = req.body;
  const host_id = req.user?.id; // ID пользователя из middleware аутентификации

  console.log('Бизнесы, прикрепленные к свадьбе:', items);

  try {
    // Валидация входных данных
    if (!name || !date) {
      return res.status(400).json({
        success: false,
        error: 'Поля name и date обязательны',
        fields: { name: !name, date: !date },
      });
    }

    const isValidDate = !isNaN(new Date(date).getTime());
    if (!isValidDate) {
      return res.status(400).json({
        success: false,
        error: 'Неверный формат даты. Используйте YYYY-MM-DD',
        field: 'date',
      });
    }

    // Проверка доступности ресторана
    const restaurantItem = items?.find((item) => item.type === 'restaurant');
    if (restaurantItem) {
      const isBooked = await BusinessAvailability.findOne({
        where: {
          restaurantId: restaurantItem.id,
          date,
        },
      });

      if (isBooked) {
        return res.status(400).json({
          success: false,
          error: 'Ресторан занят на выбранную дату',
          details: {
            restaurantId: restaurantItem.id,
            date,
          },
        });
      }
    }

    // Валидация items
    if (items && !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        error: 'Поле items должно быть массивом',
        field: 'items',
      });
    }

    // Начало транзакции
    const transaction = await Wedding.sequelize.transaction();
    try {
      // Создание свадьбы
      const wedding = await Wedding.create(
        { name, date, host_id },
        { transaction }
      );

      // Добавление элементов свадьбы, если они есть
      if (items && items.length > 0) {
        const weddingItems = items.map((item) => ({
          wedding_id: wedding.id,
          item_id: item.id,
          item_type: item.type,
          total_cost: item.totalCost || 0,
        }));

        // Проверка корректности данных в items
        for (const item of weddingItems) {
          if (!item.item_id || !item.item_type || item.total_cost < 0) {
            throw new Error(
              `Некорректные данные элемента: item_id=${item.item_id}, item_type=${item.item_type}, total_cost=${item.total_cost}`
            );
          }
        }

        await WeddingItem.bulkCreate(weddingItems, { transaction });
      }

      await transaction.commit();

      // Получение свадьбы с элементами
      const weddingWithItems = await Wedding.findByPk(wedding.id, {
        include: [WeddingItem],
      });

      return res.status(201).json({
        success: true,
        data: weddingWithItems,
        message: 'Свадьба успешно создана',
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Ошибка в транзакции при создании свадьбы:', error);
      return res.status(500).json({
        success: false,
        error: 'Ошибка при создании свадьбы',
        details: error.message,
      });
    }
  } catch (error) {
    console.error('Общая ошибка при создании свадьбы:', error);
    return res.status(500).json({
      success: false,
      error: 'Ошибка сервера',
      details: error.message,
    });
  }
};

// Получение всех свадеб пользователя (Read - List)
const getAllWeddings = async (req, res) => {
  const userId = req.user?.id;

  try {
    const weddings = await Wedding.findAll({
      where: { host_id: userId },
      include: [WeddingItem],
    });

    res.status(200).json({ success: true, data: weddings });
  } catch (error) {
    console.error('Ошибка при получении свадеб:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

// Получение одной свадьбы (Read - Single)
const getWedding = async (req, res) => {
 
  const { id } = req.params;
  
  try {
    const wedding = await Wedding.findByPk(id, {
      include: [WeddingItem],
    });

    console.log('getWedding started',wedding)
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }

    // Проверка, что пользователь — хозяин свадьбы
    // if (wedding.host_id !== req.user?.id) {
    //   return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    // }

    res.status(200).json({ success: true, data: wedding });

  } catch (error) {
    console.error('Ошибка при получении свадьбы:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};




// Обновление свадьбы (Update)
const updateWedding = async (req, res) => {
  

  const { id } = req.params;
  const {data}=req.params;
  const { name, date } = req.body;


  console.log('updateWedding  started',id,name,date)
  console.log('updateWedding req.body',req.body,'data= ',data)
  try {
    const wedding = await Wedding.findByPk(id);
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }

    if (wedding.host_id !== req.user?.id) {
      return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    }

    await wedding.update({ name, date });

    res.status(200).json({
      success: true,
      data: wedding,
      message: 'Свадьба обновлена',
    });
  } catch (error) {
    console.error('Ошибка при обновлении свадьбы:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

// Удаление свадьбы (Delete)
const deleteWedding = async (req, res) => {
  const { id } = req.params;

  try {
    const wedding = await Wedding.findByPk(id);
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }

    if (wedding.host_id !== req.user?.id) {
      return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    }

    await wedding.destroy();

    res.status(200).json({
      success: true,
      message: 'Свадьба удалена',
    });
  } catch (error) {
    console.error('Ошибка при удалении свадьбы:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

module.exports = {
  createWedding,
  getAllWeddings,
  getWedding,
  updateWedding,
  deleteWedding,
};