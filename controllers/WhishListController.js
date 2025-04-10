const {  Wedding} = require('../models');
const Goods=require('../models/Goods')
const Wishlist= require('../models/Whishlist')
const User=require('../auth/models/User')
// Создание нового элемента в списке желаний (Create)
// const createWishlistItem = async (req, res) => {
//   console.log('createwishlist started')
//   const { wedding_id, item_name, description } = req.body;
//   const userId = req.user?.id; // Предполагается, что userId приходит из middleware аутентификации
  
//   // console.log('userid',userId)
//   if (!wedding_id || !item_name) {
//     return res.status(400).json({
//       success: false,
//       error: 'wedding_id и item_name обязательны',
//     });
//   }

//   try {
//     // Проверка, что пользователь — хозяин свадьбы
//     const wedding = await Wedding.findByPk(wedding_id);
//     if (!wedding) {
//       return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
//     }
//     if (wedding.host_id !== userId) {
//       return res.status(403).json({ success: false, error: 'Только хозяин свадьбы может добавлять элементы' });
//     }

//     const wishlistItem = await Wishlist.create({
//       wedding_id,
//       item_name,
//       description,
//       reserved_by_unknown:''
//     });

//     res.status(201).json({
//       success: true,
//       data: wishlistItem,
//       message: 'Элемент добавлен в список желаний',
//     });
//   } catch (error) {
//     console.error('Ошибка при создании элемента wishlist:', error);
//     res.status(500).json({ success: false, error: 'Ошибка сервера' });
//   }
// };


const createWishlistItem = async (req, res) => {
  console.log('createWishlist started');
  const { wedding_id, good_id, item_name, description } = req.body;
  const userId = req.user?.id; // Предполагается, что userId приходит из middleware аутентификации

  if (!wedding_id) {
    return res.status(400).json({
      success: false,
      error: 'wedding_id обязателен',
    });
  }

  if (!good_id && !item_name) {
    return res.status(400).json({
      success: false,
      error: 'Необходимо указать либо good_id, либо item_name',
    });
  }

  try {
    // Проверка, что пользователь — хозяин свадьбы
    const wedding = await Wedding.findByPk(wedding_id);
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }
    if (wedding.host_id !== userId) {
      return res.status(403).json({ success: false, error: 'Только хозяин свадьбы может добавлять элементы' });
    }

    let wishlistData = { wedding_id, reserved_by_unknown: '' };

    // Если указан good_id, берем данные из таблицы Goods
    if (good_id) {
      const good = await Goods.findByPk(good_id);
      if (!good) {
        return res.status(404).json({ success: false, error: 'Товар не найден' });
      }
      wishlistData.good_id = good_id;
      wishlistData.item_name = good.item_name;
      wishlistData.description = good.description || '';
    } else {
      // Если good_id не указан, используем переданные item_name и description
      wishlistData.item_name = item_name;
      wishlistData.description = description || '';
    }

    const wishlistItem = await Wishlist.create(wishlistData);

    res.status(201).json({
      success: true,
      data: wishlistItem,
      message: 'Элемент добавлен в список желаний',
    });
  } catch (error) {
    console.error('Ошибка при создании элемента wishlist:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

// Получение списка желаний для свадьбы (Read - List)
const getWishlistByWedding = async (req, res) => {

  const { weddingId } = req.params;
  console.log('GET WHISHLIST BY ID started wedding id= ',weddingId)
  try {
    const wishlistItems = await Wishlist.findAll({
      where: { wedding_id: weddingId },
      include: [
        { model: User, as: 'Reserver', attributes: ['id', 'username'] }, // Информация о том, кто зарезервировал
      ],
    });

    if (!wishlistItems.length) {
      return res.status(200).json({ success: true, data: [], message: 'Список желаний пуст' });
    }

    res.status(200).json({ success: true, data: wishlistItems });
  } catch (error) {
    console.error('Ошибка при получении списка желаний:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

// Получение одного элемента списка желаний (Read - Single)
const getWishlistItem = async (req, res) => {
  const { id } = req.params;

  try {
    const wishlistItem = await Wishlist.findByPk(id, {
      include: [{ model: User, as: 'Reserver', attributes: ['id', 'username'] }],
    });

    if (!wishlistItem) {
      return res.status(404).json({ success: false, error: 'Элемент не найден' });
    }

    res.status(200).json({ success: true, data: wishlistItem });
  } catch (error) {
    console.error('Ошибка при получении элемента wishlist:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

// Обновление элемента списка желаний (Update - Резервирование подарка)
const reserveWishlistItem = async (req, res) => {
  console.log('reserveWishlistItem started')
  const { id } = req.params;
  const userId = req.user?.id; // ID текущего пользователя из middleware

  console.log('reserveWishlistItem     ',req.user?.id)
  try {
    const wishlistItem = await Wishlist.findByPk(id);
    if (!wishlistItem) {
      return res.status(404).json({ success: false, error: 'Элемент не найден' });
    }

    if (wishlistItem.is_reserved) {
      return res.status(400).json({ success: false, error: 'Этот подарок уже зарезервирован' });
    }

    // Проверка, что пользователь не является хозяином свадьбы
    const wedding = await Wedding.findByPk(wishlistItem.wedding_id);
    if (wedding.host_id === userId) {
      return res.status(403).json({ success: false, error: 'Хозяин свадьбы не может резервировать подарки' });
    }

    await wishlistItem.update({
      is_reserved: true,
      reserved_by: userId,
    });

    const updatedItem = await Wishlist.findByPk(id, {
      include: [{ model: User, as: 'Reserver', attributes: ['id', 'username'] }],
    });

    res.status(200).json({
      success: true,
      data: updatedItem,
      message: 'Подарок успешно зарезервирован',
    });
  } catch (error) {
    console.error('Ошибка при резервировании подарка:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};


const reserveWishlistItemByUnknown = async (req, res) => {
  console.log('reserveWishlistItem started')
  const { id } = req.params;
  const userId = req.user?.id; // ID текущего пользователя из middleware
  const data=req.body.data
  console.log('reserveWishlistItemByUnknown     ',req.body.data.reserved_by_unknown)
  const unknownUser=req.body.data.reserved_by_unknown
  try {
    const wishlistItem = await Wishlist.findByPk(id);
    if (!wishlistItem) {
      return res.status(404).json({ success: false, error: 'Элемент не найден' });
    }

    if (wishlistItem.is_reserved) {
      return res.status(400).json({ success: false, error: 'Этот подарок уже зарезервирован' });
    }

    // Проверка, что пользователь не является хозяином свадьбы
    const wedding = await Wedding.findByPk(wishlistItem.wedding_id);
    if (wedding.host_id === userId) {
      return res.status(403).json({ success: false, error: 'Хозяин свадьбы не может резервировать подарки' });
    }

    await wishlistItem.update({
      is_reserved: true,
      reserved_by_unknown: unknownUser,
    });

    const updatedItem = await Wishlist.findByPk(id, {
      include: [{ model: User, as: 'Reserver', attributes: ['id', 'username'] }],
    });

    res.status(200).json({
      success: true,
      data: updatedItem,
      message: 'Подарок успешно зарезервирован',
    });
  } catch (error) {
    console.error('Ошибка при резервировании подарка:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};
// Удаление элемента из списка желаний (Delete)
const deleteWishlistItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const wishlistItem = await Wishlist.findByPk(id);
    if (!wishlistItem) {
      return res.status(404).json({ success: false, error: 'Элемент не найден' });
    }

    // Проверка, что пользователь — хозяин свадьбы
    const wedding = await Wedding.findByPk(wishlistItem.wedding_id);
    if (wedding.host_id !== userId) {
      return res.status(403).json({ success: false, error: 'Только хозяин свадьбы может удалять элементы' });
    }

    await wishlistItem.destroy();

    res.status(200).json({
      success: true,
      message: 'Элемент удалён из списка желаний',
    });
  } catch (error) {
    console.error('Ошибка при удалении элемента wishlist:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

module.exports = {
  createWishlistItem,
  getWishlistByWedding,
  getWishlistItem,
  reserveWishlistItem,
  deleteWishlistItem,reserveWishlistItemByUnknown
};