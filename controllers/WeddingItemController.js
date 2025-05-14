const {  Wedding } = require('../models');
const WeddingItem=require('../models/WeddingItem')
// Создание элемента свадьбы (Create)
const createWeddingItem = async (req, res) => {
  const { wedding_id, item_id, item_type, total_cost } = req.body;

  if (!wedding_id || !item_id || !item_type) {
    return res.status(400).json({
      success: false,
      error: 'wedding_id, item_id и item_type обязательны',
    });
  }

  try {
    const wedding = await Wedding.findByPk(wedding_id);
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }
    if (wedding.host_id !== req.user?.id) {
      return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    }

    const weddingItem = await WeddingItem.create({
      wedding_id,
      item_id,
      item_type,
      total_cost: total_cost || 0,
    });

    res.status(201).json({
      success: true,
      data: weddingItem,
      message: 'Элемент добавлен к свадьбе',
    });
  } catch (error) {
    console.error('Ошибка при создании wedding item:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

// Получение всех элементов свадьбы (Read - List)
// const getWeddingItems = async (req, res) => {
//   const { weddingId } = req.params;
//   console.log('weddingId ',weddingId ,'req.user.id',req.user?.id)


//   try {
//     const wedding = await Wedding.findByPk(weddingId);
//     if (!wedding) {
//       return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
//     }
//     if (wedding.host_id !== req.user?.id) {
//       return res.status(403).json({ success: false, error: 'Доступ запрещён' });
//     }
//     console.log('wedding',wedding)

//     const items = await WeddingItem.findAll({ where: { wedding_id: weddingId } });
//     console.log('wedding ITEM',items)
//     res.status(200).json({ success: true, data: items });
    
//   } catch (error) {
//     console.error('Ошибка при получении wedding items:', error);
//     res.status(500).json({ success: false, error: 'Ошибка сервера' });
//   }
// };

const getWeddingItems = async (req, res) => {
  const { weddingId } = req.params;
  console.log('weddingId:', weddingId, 'req.user.id:', req.user?.id);

  try {
    // Проверяем, является ли weddingId числом
    if (!weddingId || isNaN(weddingId)) {
      return res.status(400).json({ success: false, error: 'Недействительный weddingId' });
    }

    // Находим свадьбу по weddingId
    const wedding = await Wedding.findByPk(weddingId);
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не создана' });
    }

    // Проверяем, что пользователь является организатором свадьбы
    if (wedding.host_id !== req.user?.id) {
      return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    }

    console.log('wedding:', wedding);

    // Получаем все элементы свадьбы
    const items = await WeddingItem.findAll({ where: { wedding_id: weddingId } });
    console.log('wedding ITEM:', items);

    // Проверяем, есть ли элементы
    if (!items || items.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Элементы свадьбы не найдены',
        data: [],
      });
    }

    // Возвращаем элементы, если они есть
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error('Ошибка при получении wedding items:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};



// Обновление элемента свадьбы (Update)
const updateWeddingItem = async (req, res) => {
  const { id } = req.params;
  const { item_id, item_type, total_cost } = req.body;

  try {
    const weddingItem = await WeddingItem.findByPk(id);
    if (!weddingItem) {
      return res.status(404).json({ success: false, error: 'Элемент не найден' });
    }

    const wedding = await Wedding.findByPk(weddingItem.wedding_id);
    if (wedding.host_id !== req.user?.id) {
      return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    }

    await weddingItem.update({ item_id, item_type, total_cost });

    res.status(200).json({
      success: true,
      data: weddingItem,
      message: 'Элемент обновлён',
    });
  } catch (error) {
    console.error('Ошибка при обновлении wedding item:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

// Удаление элемента свадьбы (Delete)
// const deleteWeddingItem = async (req, res) => {
//   const { id } = req.params;
//   console.log('wedding item id= ',id,typeof(id))
//   const intId=parseInt(id)
//   console.log('wedding item id= ',intId,typeof(intId))

//   try {
//     const weddingItem = await WeddingItem.findByPk(parseInt(id));
//     console.log('weddintItem= ',weddingItem)
//     if (!weddingItem) {
//       return res.status(404).json({ success: false, error: 'Элемент не найден' });
//     }

//     const wedding = await Wedding.findByPk(weddingItem.wedding_id);
//     if (wedding.host_id !== req.user?.id) {
//       return res.status(403).json({ success: false, error: 'Доступ запрещён' });
//     }

//     await weddingItem.destroy();

//     res.status(200).json({
//       success: true,
//       message: 'Элемент удалён',
//     });
//   } catch (error) {
//     console.error('Ошибка при удалении wedding item:', error);
//     res.status(500).json({ success: false, error: 'Ошибка сервера' });
//   }
// };



const deleteWeddingItem = async (req, res) => {
  const { id } = req.params;
  console.log('wedding item id=', id, typeof(id));
  const intId = parseInt(id);
  console.log('wedding item id=', intId, typeof(intId));

  try {
    // Проверяем, что WeddingItem определён
    if (!WeddingItem) {
      console.error('WeddingItem model is undefined');
      return res.status(500).json({ success: false, error: 'Модель WeddingItem не определена' });
    }

    // Проверяем, что id валидный
    if (isNaN(intId)) {
      return res.status(400).json({ success: false, error: 'Недействительный ID элемента' });
    }

     const weddingItem = await WeddingItem.findByPk(intId);
    //const weddingItem = await WeddingItem.findByPk({ where: { id: intId } });
    console.log('weddingItem=', weddingItem);
    if (!weddingItem) {
      return res.status(404).json({ success: false, error: 'Элемент не найден' });
    }

    const wedding = await Wedding.findByPk(weddingItem.wedding_id);
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }

    if (wedding.host_id !== req.user?.id) {
      return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    }

    await weddingItem.destroy();

    res.status(200).json({
      success: true,
      message: 'Элемент удалён',
    });
  } catch (error) {
    console.error('Ошибка при удалении wedding item:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера: ' + error.message });
  }
};


module.exports = {
  createWeddingItem,
  getWeddingItems,
  updateWeddingItem,
  deleteWeddingItem,
};