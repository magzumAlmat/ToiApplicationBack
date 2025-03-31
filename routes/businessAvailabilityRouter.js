// routes/businessAvailabilityRoutes.js
const express = require('express');
const router = express.Router();
const businessAvailabilityController = require('../controllers/BusinessAvailabilityController');
// const authMiddleware = require('../middleware/auth'); // Middleware для авторизации

router.post('/block',  businessAvailabilityController.blockDay);
router.get('/:restaurantId/blocked-days',  businessAvailabilityController.getBlockedDays);
router.get('/restaurants-by-date', businessAvailabilityController.getRestaurantsByDate);
router.get('/all-blocked-days', businessAvailabilityController.getAllBlockedDays);
module.exports = router;

