const express = require('express');
const router = express.Router();

const { 
    createTypography,
    getAllTypographies,
    getTypographyById,
    updateTypography,
    deleteTypography
} = require('../controllers/TypographyController');

// Создать типографию
router.post('/typography', createTypography);

// Получить все типографии
router.get('/typographies', getAllTypographies);

// Получить типографию по ID
router.get('/typography/:id', getTypographyById);

// Обновить типографию
router.put('/typography/:id', updateTypography);

// Удалить типографию
router.delete('/typography/:id', deleteTypography);

module.exports = router;

