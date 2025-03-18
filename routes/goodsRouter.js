// api/routes/goods.js
const express = require('express');
const router = express.Router();
const goodsController = require('../controllers/GoodsController');
const upload = require("../config/multer");
// Добавление нового товара
router.post('/goods', goodsController.addGood);


// Получение всех товаров
router.get('/goods', goodsController.getAllGoods);

module.exports = router;