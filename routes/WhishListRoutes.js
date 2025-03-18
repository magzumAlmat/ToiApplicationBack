const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/WhishListController');
const passport = require('passport');
// Middleware для аутентификации (пример)
const authenticate = (req, res, next) => {
  // console.log('req.user from whishlistRouter',req.user)
  // console.log('req.user from whishlistRouter',req.header)
  // Здесь должна быть ваша логика проверки токена, например, с использованием JWT
  
  // console.log('req user from auth',req.user)
  next();
};


router.post('/wishlist/',passport.authenticate('jwt', {session: false}), authenticate, wishlistController.createWishlistItem); // Создание элемента
router.get('/wishlist/:weddingId', authenticate, wishlistController.getWishlistByWedding); // Получение списка по свадьбе
router.get('/wishlist/item/:id', authenticate, wishlistController.getWishlistItem); // Получение одного элемента
router.patch('/wishlist/:id/reserve',  wishlistController.reserveWishlistItem); // Резервирование подарка
router.patch('/wishlist/:id/reservebyunknown',  wishlistController.reserveWishlistItemByUnknown); // Резервирование подарка
router.delete('/wishlist/:id', authenticate, wishlistController.deleteWishlistItem); // Удаление элемента



module.exports = router;