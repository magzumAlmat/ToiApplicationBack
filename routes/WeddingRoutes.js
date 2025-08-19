const express = require('express');
const router = express.Router();
const weddingController = require('../controllers/WeddingController');
const passport = require('passport');
const authenticate = (req, res, next) => {
 
  next();
};

router.post('/weddings/addwedding', passport.authenticate('jwt', {session: false}),authenticate, weddingController.createWedding);
router.get('/getallweddings', passport.authenticate('jwt', {session: false}),authenticate, weddingController.getAllWeddings);

router.get('/weddings/:id', passport.authenticate('jwt', {session: false}),authenticate, weddingController.getWedding);
router.put('/updateweddingbyid/:id', passport.authenticate('jwt', { session: false }), authenticate,weddingController.updateWedding);
router.delete('/weddings/:id', passport.authenticate('jwt', {session: false}),authenticate, weddingController.deleteWedding);

// Routes for updating individual fields
router.patch('/weddings/:id/total_cost', passport.authenticate('jwt', {session: false}),authenticate, weddingController.updateTotalCost);
router.patch('/weddings/:id/paid_amount', passport.authenticate('jwt', {session: false}),authenticate, weddingController.updatePaidAmount);
router.patch('/weddings/:id/remaining_balance', passport.authenticate('jwt', {session: false}),authenticate, weddingController.updateRemainingBalance);


module.exports = router;
