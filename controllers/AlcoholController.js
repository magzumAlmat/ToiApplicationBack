const Alcohol = require('../models/Alcohol');
const File =require('../models/File')
exports.createAlcohol = async (req, res) => {
    const { salonName, address, phone, district, alcoholName, category, cost ,supplier_id} = req.body;
    try {
        const alcohol = await Alcohol.create({ salonName, address, phone, district, alcoholName, category, cost ,supplier_id});
        res.status(201).json(alcohol);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllAlcohol = async (req, res) => {
    try {
        const alcoholItems = await Alcohol.findAll();
        res.status(200).json(alcoholItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAlcoholById = async (req, res) => {
    const { id } = req.params;
    try {
        const alcohol = await Alcohol.findByPk(id);
        if (!alcohol) return res.status(404).json({ message: 'Алкоголь не найден' });
        res.status(200).json(alcohol);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAlcohol = async (req, res) => {
    const { id } = req.params;
    const { salonName, address, phone, district, alcoholName, category, cost } = req.body;
    try {
        const alcohol = await Alcohol.findByPk(id);
        if (!alcohol) return res.status(404).json({ message: 'Алкоголь не найден' });
        await alcohol.update({ salonName, address, phone, district, alcoholName, category, cost });
        res.status(200).json({ message: 'Алкоголь обновлён', alcohol });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAlcohol = async (req, res) => {
    const { id } = req.params;
    try {
        await File.destroy({ where: { alcohol_id: id } });
        const deleted = await Alcohol.destroy({ where: { id } });
        if (deleted) return res.status(204).send();
        res.status(404).json({ error: 'Алкоголь не найден' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};