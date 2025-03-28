// controllers/businessAvailabilityController.js
const { BusinessAvailability, Restaurant } = require('../models');
const { Op } = require('sequelize');


exports.getAllBlockedDays = async (req, res) => {
  try {
    const bookedEntries = await BusinessAvailability.findAll({
      where: { isBooked: true },
      include: [
        {
          model: Restaurant,
          attributes: ['id', 'name'],
          required: true,
        },
      ],
    });

    const blockedDays = bookedEntries.map((entry) => ({
      date: entry.date,
      restaurantId: entry.Restaurant.id,
      restaurantName: entry.Restaurant.name,
    }));

    return res.status(200).json(blockedDays);
  } catch (error) {
    console.error('Ошибка при получении всех заблокированных дней:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

exports.getRestaurantsByDate = async (req, res) => {
  try {
    // Получаем дату из параметров запроса (например, /api/restaurants-by-date?date=2025-03-28)
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Дата не указана' });
    }

    // Проверяем формат даты (опционально)
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (!isValidDate) {
      return res.status(400).json({ error: 'Неверный формат даты. Используйте YYYY-MM-DD' });
    }

    // Ищем все записи в BusinessAvailability для указанной даты с isBooked: true
    const bookedEntries = await BusinessAvailability.findAll({
      where: {
        date: date, // Точная дата
        isBooked: true, // Только забронированные
      },
      include: [
        {
          model: Restaurant, // Связываем с таблицей Restaurants
          attributes: ['id', 'name'], // Выбираем только id и name ресторана
          required: true, // INNER JOIN, чтобы исключить записи без ресторана
        },
      ],
    });

    // Формируем ответ: список ресторанов
    const restaurants = bookedEntries.map((entry) => ({
      id: entry.Restaurant.id,
      name: entry.Restaurant.name,
    }));

    // Возвращаем результат
    return res.status(200).json({
      date,
      restaurants,
      total: restaurants.length,
    });
  } catch (error) {
    console.error('Ошибка при получении ресторанов по дате:', error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};



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


