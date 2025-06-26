const express = require('express');
const router = express.Router();

const suvenirsController = require('../controllers/Suvenirs');

// Роуты
router.get('/', suvenirsController.getAllSuvenirs);               // GET /api/suvenirs
router.get('/:id', suvenirsController.getSuvenirById);           // GET /api/suvenirs/:id
router.post('/', suvenirsController.createSuvenir);              // POST /api/suvenirs
router.put('/:id', suvenirsController.updateSuvenir);            // PUT /api/suvenirs/:id
router.delete('/:id', suvenirsController.deleteSuvenir);         // DELETE /api/suvenirs/:id

module.exports = router;