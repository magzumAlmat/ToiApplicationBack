const { Wedding, BusinessAvailability } = require('../models');
const WeddingItem = require('../models/WeddingItem');

// Создание новой свадьбы (Create)
const createWedding = async (req, res) => {
  const { name, date, items, total_cost, paid_amount, remaining_balance } = req.body;
  const host_id = req.user?.id;

  try {
    // Валидация
    if (!name || !date) {
      return res.status(400).json({
        success: false,
        error: 'Поля name и date обязательны',
      });
    }

    const transaction = await Wedding.sequelize.transaction();
    try {
      const wedding = await Wedding.create(
        {
          name,
          date,
          host_id,
          total_cost: total_cost || 0,
          paid_amount: paid_amount || 0,
          remaining_balance: remaining_balance || 0,
        },
        { transaction }
      );

      if (items && items.length > 0) {
        const weddingItems = items.map((item) => ({
          wedding_id: wedding.id,
          item_id: item.id,
          item_type: item.type,
          total_cost: item.totalCost || 0,
        }));
        await WeddingItem.bulkCreate(weddingItems, { transaction });
      }

      await transaction.commit();

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

// Обновление свадьбы (Update)
const updateWedding = async (req, res) => {
  const { id } = req.params;
  const { name, date, items, total_cost, paid_amount, remaining_balance } = req.body;

  try {
    const wedding = await Wedding.findByPk(id);
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }

    if (wedding.host_id !== req.user?.id) {
      return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    }

    const transaction = await Wedding.sequelize.transaction();
    try {
      const updateData = { name, date };
      if (total_cost !== undefined) {
        updateData.total_cost = total_cost;
      }
      if (paid_amount !== undefined) {
        updateData.paid_amount = paid_amount;
      }
      if (remaining_balance !== undefined) {
        updateData.remaining_balance = remaining_balance;
      }

      await wedding.update(updateData, { transaction });

      if (items && Array.isArray(items)) {
        await WeddingItem.destroy({ where: { wedding_id: id }, transaction });
        const weddingItems = items.map((item) => ({
          wedding_id: wedding.id,
          item_id: item.id,
          item_type: item.type,
          total_cost: item.totalCost || 0,
        }));
        await WeddingItem.bulkCreate(weddingItems, { transaction });
      }

      await transaction.commit();

      const weddingWithItems = await Wedding.findByPk(id, {
        include: [WeddingItem],
      });

      return res.status(200).json({
        success: true,
        data: weddingWithItems,
        message: 'Свадьба обновлена',
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Ошибка в транзакции при обновлении свадьбы:', error);
      return res.status(500).json({
        success: false,
        error: 'Ошибка при обновлении свадьбы',
        details: error.message,
      });
    }
  } catch (error) {
    console.error('Общая ошибка при обновлении свадьбы:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
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
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }
    res.status(200).json({ success: true, data: wedding });
  } catch (error) {
    console.error('Ошибка при получении свадьбы:', error);
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

// Update total_cost
const updateTotalCost = async (req, res) => {
  const { id } = req.params;
  const { total_cost } = req.body;

  if (total_cost === undefined) {
    return res.status(400).json({ success: false, error: 'Поле total_cost обязательно' });
  }

  try {
    const wedding = await Wedding.findByPk(id);
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }

    if (wedding.host_id !== req.user?.id) {
      return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    }

    await wedding.update({ total_cost });

    res.status(200).json({
      success: true,
      data: wedding,
      message: 'Общая сумма обновлена',
    });
  } catch (error) {
    console.error('Ошибка при обновлении общей суммы:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

// Update paid_amount
const updatePaidAmount = async (req, res) => {
  const { id } = req.params;
  const { paid_amount } = req.body;

  if (paid_amount === undefined) {
    return res.status(400).json({ success: false, error: 'Поле paid_amount обязательно' });
  }

  try {
    const wedding = await Wedding.findByPk(id);
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }

    if (wedding.host_id !== req.user?.id) {
      return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    }

    await wedding.update({ paid_amount });

    res.status(200).json({
      success: true,
      data: wedding,
      message: 'Потраченная сумма обновлена',
    });
  } catch (error) {
    console.error('Ошибка при обновлении потраченной суммы:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

// Update remaining_balance
const updateRemainingBalance = async (req, res) => {
  const { id } = req.params;
  const { remaining_balance } = req.body;

  if (remaining_balance === undefined) {
    return res.status(400).json({ success: false, error: 'Поле remaining_balance обязательно' });
  }

  try {
    const wedding = await Wedding.findByPk(id);
    if (!wedding) {
      return res.status(404).json({ success: false, error: 'Свадьба не найдена' });
    }

    if (wedding.host_id !== req.user?.id) {
      return res.status(403).json({ success: false, error: 'Доступ запрещён' });
    }

    await wedding.update({ remaining_balance });

    res.status(200).json({
      success: true,
      data: wedding,
      message: 'Остаток обновлен',
    });
  } catch (error) {
    console.error('Ошибка при обновлении остатка:', error);
    res.status(500).json({ success: false, error: 'Ошибка сервера' });
  }
};

module.exports = {
  createWedding,
  getAllWeddings,
  getWedding,
  updateWedding,
  deleteWedding,
  updateTotalCost,
  updatePaidAmount,
  updateRemainingBalance,
};