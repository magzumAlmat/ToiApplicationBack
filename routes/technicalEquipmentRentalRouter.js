const express = require('express');
const router = express.Router();

const { 
    createTechnicalEquipmentRental,
    getAllTechnicalEquipmentRentals,
    getTechnicalEquipmentRentalById,
    updateTechnicalEquipmentRental,
    deleteTechnicalEquipmentRental
} = require('../controllers/TechnicalEquipmentRentalController');

// Создать аренду технического оснащения
router.post('/technical-equipment-rental', createTechnicalEquipmentRental);

// Получить все аренды технического оснащения
router.get('/technical-equipment-rentals', getAllTechnicalEquipmentRentals);

// Получить аренду технического оснащения по ID
router.get('/technical-equipment-rental/:id', getTechnicalEquipmentRentalById);

// Обновить аренду технического оснащения
router.put('/technical-equipment-rental/:id', updateTechnicalEquipmentRental);

// Удалить аренду технического оснащения
router.delete('/technical-equipment-rental/:id', deleteTechnicalEquipmentRental);

module.exports = router;

