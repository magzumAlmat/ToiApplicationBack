// api/routes/goods.js
const express = require('express');
const router = express.Router();
const goodsController = require('../controllers/GoodsController');
const upload = require("../config/multer");
// Добавление нового товара
router.post('/goods', goodsController.addGood);


// Получение всех товаров
router.get('/goods', goodsController.getAllGoods);


router.get(`/goodbyid/:id`, goodsController.getGoodById)

router.put(`/updategoodbyid/:id`, goodsController.updateGoodById)

router.delete(`/removegoodbyid/:id`, goodsController.deleteGoodsById)

module.exports = router;