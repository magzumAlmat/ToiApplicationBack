const express = require('express');
const router = express.Router();

// Импорт контроллеров
const {
  createClothing,
  getAllClothing,
  getClothingById,
  updateClothing,
  deleteClothing
} = require('../controllers/ClothingController');

const {
  createTransport,
  getAllTransport,
  getTransportById,
  updateTransport,
  deleteTransport
} = require('../controllers/TransportController');

const {
  createTamada,
  getAllTamada,
  getTamadaById,
  updateTamada,
  deleteTamada
} = require('../controllers/TamadaController');

const {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram
} = require('../controllers/ProgramController');

const {
  createTraditionalGift,
  getAllTraditionalGifts,
  getTraditionalGiftById,
  updateTraditionalGift,
  deleteTraditionalGift
} = require('../controllers/TraditionalGiftsController');

const {
  createFlowers,
  getAllFlowers,
  getFlowersById,
  updateFlowers,
  deleteFlowers
} = require('../controllers/FlowersController');

const {
  createCake,
  getAllCakes,
  getCakeById,
  updateCake,
  deleteCake
} = require('../controllers/CakesController');

const {
  createAlcohol,
  getAllAlcohol,
  getAlcoholById,
  updateAlcohol,
  deleteAlcohol
} = require('../controllers/AlcoholController');

// Роуты для "Одежда" (Clothing)
router.post('/clothing', createClothing);              // Создать запись
router.get('/clothing', getAllClothing);               // Получить все записи
router.get('/clothing/:id', getClothingById);          // Получить запись по ID
router.put('/clothing/:id', updateClothing);           // Обновить запись
router.delete('/clothing/:id', deleteClothing);        // Удалить запись

// Роуты для "Транспорт" (Transport)
router.post('/transport', createTransport);
router.get('/transport', getAllTransport);
router.get('/transport/:id', getTransportById);
router.put('/transport/:id', updateTransport);
router.delete('/transport/:id', deleteTransport);

// Роуты для "Тамада" (Tamada)
router.post('/tamada', createTamada);
router.get('/tamada', getAllTamada);
router.get('/tamada/:id', getTamadaById);
router.put('/tamada/:id', updateTamada);
router.delete('/tamada/:id', deleteTamada);

// Роуты для "Программа" (Program)
router.post('/programs', createProgram);
router.get('/programs', getAllPrograms);
router.get('/programs/:id', getProgramById);
router.put('/programs/:id', updateProgram);
router.delete('/programs/:id', deleteProgram);

// Роуты для "Традиционные подарки" (TraditionalGifts)
router.post('/traditional-gifts', createTraditionalGift);
router.get('/traditional-gifts', getAllTraditionalGifts);
router.get('/traditional-gifts/:id', getTraditionalGiftById);
router.put('/traditional-gifts/:id', updateTraditionalGift);
router.delete('/traditional-gifts/:id', deleteTraditionalGift);

// Роуты для "Цветы" (Flowers)
router.post('/flowers', createFlowers);
router.get('/flowers', getAllFlowers);
router.get('/flowers/:id', getFlowersById);
router.put('/flowers/:id', updateFlowers);
router.delete('/flowers/:id', deleteFlowers);

// Роуты для "Торты" (Cakes)
router.post('/cakes', createCake);
router.get('/cakes', getAllCakes);
router.get('/cakes/:id', getCakeById);
router.put('/cakes/:id', updateCake);
router.delete('/cakes/:id', deleteCake);

// Роуты для "Алкоголь" (Alcohol)
router.post('/alcohol', createAlcohol);
router.get('/alcohol', getAllAlcohol);
router.get('/alcohol/:id', getAlcoholById);
router.put('/alcohol/:id', updateAlcohol);
router.delete('/alcohol/:id', deleteAlcohol);

module.exports = router;