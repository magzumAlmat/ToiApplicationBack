const express = require('express');
const router = express.Router();
const weddingItemController = require('../controllers/WeddingItemController');

const authenticate = (req, res, next) => {
  const userId = 1; // Заглушка, замените на реальную логику аутентификации
  req.user = { id: userId };
  next();
};

router.post('/wedding-items', weddingItemController.createWeddingItem);

router.get('/wedding-items/:weddingId', authenticate, weddingItemController.getWeddingItems);
router.put('/wedding-items/:id', authenticate, weddingItemController.updateWeddingItem);
router.delete('/wedding-items/:id', authenticate, weddingItemController.deleteWeddingItem);

module.exports = router;