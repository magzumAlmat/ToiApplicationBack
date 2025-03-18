const Goods = require('../models/Goods');

exports.addGood = async (req, res) => {
  try {
    const { category, item_name, description, price_range, supplier_id } = req.body;
    if (!category || !item_name) {
      return res.status(400).json({ error: 'Категория и название товара обязательны' });
    }
    const newGood = await Goods.create({
      category,
      item_name,
      description: description || '',
      price_range: price_range || '',
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