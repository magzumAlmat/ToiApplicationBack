const express = require('express');
const router = express.Router();
const weddingController = require('../controllers/WeddingController');
const passport = require('passport');
const authenticate = (req, res, next) => {
 
  next();
};

router.post('/weddings/addwedding', passport.authenticate('jwt', {session: false}),authenticate, weddingController.createWedding);
router.get('/weddings', passport.authenticate('jwt', {session: false}),authenticate, weddingController.getWeddings);

router.get('/weddings/:id', passport.authenticate('jwt', {session: false}),authenticate, weddingController.getWedding);
router.put('/weddings//:id', passport.authenticate('jwt', {session: false}),authenticate, weddingController.updateWedding);
router.delete('/weddings/:id', passport.authenticate('jwt', {session: false}),authenticate, weddingController.deleteWedding);

module.exports = router;
