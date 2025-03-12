const Clothing = require('../models/Clothing');

exports.createClothing = async (req, res) => {
    const { storeName, address, phone, district, gender, itemName, cost } = req.body;
    try {
        const clothing = await Clothing.create({ storeName, address, phone, district, gender, itemName, cost });
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
        const deleted = await Clothing.destroy({ where: { id } });
        if (deleted) return res.status(204).send();
        res.status(404).json({ error: 'Одежда не найдена' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};