const Tamada = require('../models/Tamada');

exports.createTamada = async (req, res) => {
    const { portfolio, cost } = req.body;
    try {
        const tamada = await Tamada.create({ portfolio, cost });
        res.status(201).json(tamada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTamada = async (req, res) => {
    try {
        const tamadas = await Tamada.findAll();
        res.status(200).json(tamadas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTamadaById = async (req, res) => {
    const { id } = req.params;
    try {
        const tamada = await Tamada.findByPk(id);
        if (!tamada) return res.status(404).json({ message: 'Тамада не найден' });
        res.status(200).json(tamada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTamada = async (req, res) => {
    const { id } = req.params;
    const { portfolio, cost } = req.body;
    try {
        const tamada = await Tamada.findByPk(id);
        if (!tamada) return res.status(404).json({ message: 'Тамада не найден' });
        await tamada.update({ portfolio, cost });
        res.status(200).json({ message: 'Тамада обновлён', tamada });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTamada = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Tamada.destroy({ where: { id } });
        if (deleted) return res.status(204).send();
        res.status(404).json({ error: 'Тамада не найден' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};