const express = require('express');
const router = express.Router();
// const courseController = require('../controllers/courseController');

// const passport = require('passport');

const { createRestaurant,getAllRestaurants ,getAllRestaurantById,getAllRestaurantByIdId,updateRestaurant} = require('../controllers/RestaurantController');
// Создать курс

router.post('/restaurant', createRestaurant);
// router.get(`/restaurant/:id`, getAllRestaurantById);
router.get(`/restaurants`, getAllRestaurants);
router.get(`/restaurantbyid/:id`, getAllRestaurantByIdId);
router.put('/restaurant/:id',updateRestaurant)
module.exports = router;

