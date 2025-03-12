const TraditionalGifts = require('../models/TraditionalGifts');

exports.createTraditionalGift = async (req, res) => {
    const { salonName, address, phone, district, itemName, type, cost ,supplier_id } = req.body;
    try {
        const gift = await TraditionalGifts.create({ salonName, address, phone, district, itemName, type, cost ,supplier_id});
        res.status(201).json(gift);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTraditionalGifts = async (req, res) => {
    try {
        const gifts = await TraditionalGifts.findAll();
        res.status(200).json(gifts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTraditionalGiftById = async (req, res) => {
    const { id } = req.params;
    try {
        const gift = await TraditionalGifts.findByPk(id);
        if (!gift) return res.status(404).json({ message: 'Подарок не найден' });
        res.status(200).json(gift);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTraditionalGift = async (req, res) => {
    const { id } = req.params;
    const { salonName, address, phone, district, itemName, type, cost } = req.body;
    try {
        const gift = await TraditionalGifts.findByPk(id);
        if (!gift) return res.status(404).json({ message: 'Подарок не найден' });
        await gift.update({ salonName, address, phone, district, itemName, type, cost });
        res.status(200).json({ message: 'Подарок обновлён', gift });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTraditionalGift = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await TraditionalGifts.destroy({ where: { id } });
        if (deleted) return res.status(204).send();
        res.status(404).json({ error: 'Подарок не найден' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};