const Jewelry = require('../models/Jewelry');
const File = require('../models/File');

exports.createJewelry = async (req, res) => {
    const { storeName, address, phone, district, itemName, material, cost, supplier_id ,type} = req.body;
    try {
        const jewelry = await Jewelry.create({ storeName, address, phone, district, itemName, material, cost, supplier_id,type });
        res.status(201).json(jewelry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllJewelry = async (req, res) => {
    try {
        const jewelryItems = await Jewelry.findAll();
        res.status(200).json(jewelryItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJewelryById = async (req, res) => {
    const { id } = req.params;
    try {
        const jewelry = await Jewelry.findByPk(id);
        if (!jewelry) return res.status(404).json({ message: 'Ювелирное изделие не найдено' });
        res.status(200).json(jewelry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateJewelry = async (req, res) => {
    const { id } = req.params;
    const { storeName, address, phone, district, itemName, material, cost, supplier_id ,type} = req.body;
    try {
        const jewelry = await Jewelry.findByPk(id);
        if (!jewelry) return res.status(404).json({ message: 'Ювелирное изделие не найдено' });
        await jewelry.update({ storeName, address, phone, district, itemName, material, cost, supplier_id ,type});
        res.status(200).json({ message: 'Ювелирное изделие обновлено', jewelry });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteJewelry = async (req, res) => {
    const { id } = req.params;
    try {
        await File.destroy({ where: { jewelry_id: id } });
        const deleted = await Jewelry.destroy({ where: { id } });
        if (deleted) return res.status(204).send();
        res.status(404).json({ error: 'Ювелирное изделие не найдено' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};