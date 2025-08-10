const express = require('express');
const router = express.Router();
const weddingItemController = require('../controllers/WeddingItemController');
const passport = require('passport');

const authenticate = (req, res, next) => {
 
  next();
};

router.post('/wedding-items', passport.authenticate('jwt', {session: false}),authenticate, weddingItemController.createWeddingItem);

router.get('/wedding-items/:weddingId',passport.authenticate('jwt', {session: false}),authenticate, weddingItemController.getWeddingItems);
router.put('/wedding-items/:id',passport.authenticate('jwt', {session: false}),authenticate, weddingItemController.updateWeddingItem);
router.delete('/wedding-items/:id', passport.authenticate('jwt', {session: false}),authenticate, weddingItemController.deleteWeddingItem);

module.exports = router;