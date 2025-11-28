const express = require('express');
const router = express.Router();
const passport = require('passport');
const { 
    createEventCategory,
    getAllEventCategories,
    getEventCategoryById,
    getEventCategoryWithServices,
    updateEventCategory,
    deleteEventCategory,
    addServiceToCategory,
    removeServiceFromCategory,
    updateTotalCost,
    updatePaidAmount,
    updateRemainingBalance
} = require('../controllers/EventCategoryController');


const { getAllServices ,updateServicesForCategory} = require('../controllers/EventCategoryController');



router.post('/event-category/:categoryId/services', addServiceToCategory);
router.put('/event-category/:categoryId/services', updateServicesForCategory);




router.get('/services', getAllServices);


// Создать категорию мероприятия

router.post('/event-category', passport.authenticate('jwt', {session: false}), createEventCategory);
// Получить все категории мероприятий
router.get('/event-categories', getAllEventCategories);

// Получить категорию мероприятия по ID
router.get('/event-category/:id', getEventCategoryById);

// Получить категорию мероприятия с детальной информацией об услугах
router.get('/event-category/:id/services', getEventCategoryWithServices);

// Обновить категорию мероприятия
router.put('/event-category/:id', updateEventCategory);

// Удалить категорию мероприятия
router.delete('/event-category/:id', deleteEventCategory);

// Добавить услугу к категории
router.post('/event-category/:categoryId/service', addServiceToCategory);

// Удалить услугу из категории
router.delete('/event-category/:categoryId/service/:serviceId', removeServiceFromCategory);

// Routes for updating individual fields
router.patch('/event-category/:id/total_cost', updateTotalCost);
router.patch('/event-category/:id/paid_amount', updatePaidAmount);
router.patch('/event-category/:id/remaining_balance', updateRemainingBalance);


module.exports = router;

