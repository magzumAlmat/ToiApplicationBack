const Goods = require('../models/Goods');
const File =require('../models/File')
exports.addGood = async (req, res) => {
  try {
    const { category, item_name, description, cost, supplier_id } = req.body;
    if (!category || !item_name) {
      return res.status(400).json({ error: 'Категория и название товара обязательны' });
    }
    const newGood = await Goods.create({
      category,
      item_name,
      description: description || '',
      cost: cost || '',
      supplier_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    res.status(201).json({ message: 'Товар успешно добавлен', data: { id: newGood.id, ...req.body } });
    
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

exports.getAllGoods = async (req, res) => {
  try {
    const goods = await Goods.findAll();
    res.status(200).json(goods);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};


exports.getGoodById = async (req, res) => {
  const { id } = req.params;
  try {
      const goods = await Goods.findByPk(id);
      if (!goods) return res.status(404).json({ message: 'Товары не найдены' });
      res.status(200).json(goods);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


exports.updateGoodById = async (req, res) => {
 
  const { id } = req.params;
  const { item_name, description, cost
    // specs,
   } = req.body;
   console.log('Update started',item_name, description, cost)
  try {
      const goods = await Goods.findByPk(id);
      if (!goods) return res.status(404).json({ message: 'Товары не найдены' });
      await goods.update({ item_name, description, cost});
      res.status(200).json({ message: 'Товары обновлены', goods });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};




exports.deleteGoodsById = async (req, res) => {

  const { id } = req.params;
  console.log('deleteGoodsByID started id= ',id)
  try {
      await File.destroy({ where: { goods_id: id } });
      const deleted = await Goods.destroy({ where: { id } });
      if (deleted) return res.status(204).send();
      res.status(404).json({ error: 'товар не найдены' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// exports.uploadFile = async (req, res) => {
//   const { id } = req.params;
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded.' });
//   }
//   const fileData = {
//     filename: req.file.filename,
//     path: req.file.path,
//     entityType: 'goods',
//     entityId: id,
//   };
//   res.status(200).json({ message: 'File uploaded successfully', file: fileData });
// };