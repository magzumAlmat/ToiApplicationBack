const express = require('express');
const router = express.Router();
// const courseController = require('../controllers/courseController');

// const passport = require('passport');

const { createRestaurant } = require('../controllers/RestaurantController');
// Создать курс

router.post('/restaurant', createRestaurant);


module.exports = router;