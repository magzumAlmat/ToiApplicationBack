const express = require('express');
const router = express.Router();

const { 
    createHotel,
    getAllHotels,
    getHotelById,
    updateHotel,
    deleteHotel
} = require('../controllers/HotelController');

// Создать гостиницу
router.post('/hotel', createHotel);

// Получить все гостиницы
router.get('/hotels', getAllHotels);

// Получить гостиницу по ID
router.get('/hotel/:id', getHotelById);

// Обновить гостиницу
router.put('/hotel/:id', updateHotel);

// Удалить гостиницу
router.delete('/hotel/:id', deleteHotel);

module.exports = router;

