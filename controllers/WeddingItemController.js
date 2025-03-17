const { WeddingItem, Wedding } = require('../models');

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
const getWeddingItems = async (req, res) => {
  const { weddingId } = req.params;

  try {
    const wedding = await Wedding.findByPk(weddingId);
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }
    if (wedding.host_id !== req.user?.id) {
      return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    }

    const items = await WeddingItem.findAll({ where: { wedding_id: weddingId } });
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
const deleteWeddingItem = async (req, res) => {
  const { id } = req.params;

  try {
    const weddingItem = await WeddingItem.findByPk(id);
    if (!weddingItem) {
      return res.status(404).json({ success: false, error: 'Элемент не найден' });
    }

    const wedding = await Wedding.findByPk(weddingItem.wedding_id);
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
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

module.exports = {
  createWeddingItem,
  getWeddingItems,
  updateWeddingItem,
  deleteWeddingItem,
};