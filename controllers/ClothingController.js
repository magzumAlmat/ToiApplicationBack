const Clothing = require('../models/Clothing');
const File =require('../models/File')

exports.createClothing = async (req, res) => {
    console.log('create clothing')
    const { storeName, address, phone, district, gender, itemName, cost,supplier_id } = req.body;
    try {
        const clothing = await Clothing.create({ storeName, address, phone, district, gender, itemName, cost,supplier_id });
        res.status(201).json(clothing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllClothing = async (req, res) => {
    try {
        const clothingItems = await Clothing.findAll();
        res.status(200).json(clothingItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getClothingById = async (req, res) => {
    const { id } = req.params;
    try {
        const clothing = await Clothing.findByPk(id);
        if (!clothing) return res.status(404).json({ message: 'Одежда не найдена' });
        res.status(200).json(clothing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateClothing = async (req, res) => {
    const { id } = req.params;
    const { storeName, address, phone, district, gender, itemName, cost } = req.body;
    try {
        const clothing = await Clothing.findByPk(id);
        if (!clothing) return res.status(404).json({ message: 'Одежда не найдена' });
        await clothing.update({ storeName, address, phone, district, gender, itemName, cost });
        res.status(200).json({ message: 'Одежда обновлена', clothing });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteClothing = async (req, res) => {
    const { id } = req.params;
    try {
        // Попытка удалить связанные файлы (не влияет на основной процесс)
        await File.destroy({ where: { clothing_id: id } });

        // Удаление записи Clothing
        const deleted = await Clothing.destroy({ where: { id } });

        // Если запись удалена (deleted > 0) или просто продолжаем, возвращаем 204
        if (deleted === 0) {
            // Если запись не найдена, возвращаем 404
            return res.status(404).json({ error: 'Одежда не найдена' });
        }

        // Успешное удаление
        return res.status(204).send();
    } catch (error) {
        console.error('Ошибка удаления:', error);
        res.status(500).json({ error: error.message });
    }
};