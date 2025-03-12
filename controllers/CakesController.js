const Cakes = require('../models/Cakes');

exports.createCake = async (req, res) => {
    const { salonName, address, phone, district, cakeType, cost ,supplier_id } = req.body;
    try {
        const cake = await Cakes.create({ salonName, address, phone, district, cakeType, cost ,supplier_id});
        res.status(201).json(cake);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllCakes = async (req, res) => {
    try {
        const cakes = await Cakes.findAll();
        res.status(200).json(cakes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCakeById = async (req, res) => {
    const { id } = req.params;
    try {
        const cake = await Cakes.findByPk(id);
        if (!cake) return res.status(404).json({ message: 'Торт не найден' });
        res.status(200).json(cake);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCake = async (req, res) => {
    const { id } = req.params;
    const { salonName, address, phone, district, cakeType, cost } = req.body;
    try {
        const cake = await Cakes.findByPk(id);
        if (!cake) return res.status(404).json({ message: 'Торт не найден' });
        await cake.update({ salonName, address, phone, district, cakeType, cost });
        res.status(200).json({ message: 'Торт обновлён', cake });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCake = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Cakes.destroy({ where: { id } });
        if (deleted) return res.status(204).send();
        res.status(404).json({ error: 'Торт не найден' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};