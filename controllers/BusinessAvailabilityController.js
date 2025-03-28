// controllers/businessAvailabilityController.js
const { BusinessAvailability, Restaurant } = require('../models');

exports.blockDay = async (req, res) => {
  const { restaurantId, date } = req.body;

  console.log('1 from post request',restaurantId,date)
  try {
    // Проверка, что ресторан существует и принадлежит менеджеру
    const restaurant = await Restaurant.findOne({
      where: { id: restaurantId }, // req.user.id — ID менеджера
    });
    if (!restaurant) {
      return res.status(404).json({ message: 'Ресторан не найден или не принадлежит вам' });
    }

    console.log('2 finded restaurant is= ',restaurant)
    // Проверка, не заблокирован ли день уже
    const existingBooking = await BusinessAvailability.findOne({
      where: { restaurantId, date },
    });
    if (existingBooking) {
      return res.status(400).json({ message: 'Этот день уже заблокирован' });
    }

    // Создание записи о занятости
    const blockedDay = await BusinessAvailability.create({
      restaurantId,
      date,
      isBooked: true,
    });

    res.status(201).json({ message: 'День успешно заблокирован', blockedDay });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.getBlockedDays = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const restaurant = await Restaurant.findOne({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      return res.status(404).json({ message: 'Ресторан не найден или не принадлежит вам' });
    }

    const blockedDays = await BusinessAvailability.findAll({
      where: { restaurantId },
      attributes: ['date'],
    });

    res.status(200).json(blockedDays.map(day => day.date));
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};