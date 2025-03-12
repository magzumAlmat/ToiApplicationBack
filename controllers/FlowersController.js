const Flowers = require('../models/Flowers');

exports.createFlowers = async (req, res) => {
    const { salonName, address, phone, district, flowerName, flowerType, cost ,supplier_id} = req.body;
    try {
        const flowers = await Flowers.create({ salonName, address, phone, district, flowerName, flowerType, cost ,supplier_id});
        res.status(201).json(flowers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllFlowers = async (req, res) => {
    try {
        const flowers = await Flowers.findAll();
        res.status(200).json(flowers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFlowersById = async (req, res) => {
    const { id } = req.params;
    try {
        const flowers = await Flowers.findByPk(id);
        if (!flowers) return res.status(404).json({ message: 'Цветы не найдены' });
        res.status(200).json(flowers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFlowers = async (req, res) => {
    const { id } = req.params;
    const { salonName, address, phone, district, flowerName, flowerType, cost } = req.body;
    try {
        const flowers = await Flowers.findByPk(id);
        if (!flowers) return res.status(404).json({ message: 'Цветы не найдены' });
        await flowers.update({ salonName, address, phone, district, flowerName, flowerType, cost });
        res.status(200).json({ message: 'Цветы обновлены', flowers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteFlowers = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Flowers.destroy({ where: { id } });
        if (deleted) return res.status(204).send();
        res.status(404).json({ error: 'Цветы не найдены' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};