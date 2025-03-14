const Tamada = require('../models/Tamada');
const File =require('../models/File')
exports.createTamada = async (req, res) => {
    const { portfolio, cost,supplier_id,name } = req.body;
    try {
        const tamada = await Tamada.create({ portfolio, cost,supplier_id,name });
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
    const { portfolio, cost,name } = req.body;
    try {
        const tamada = await Tamada.findByPk(id);
        if (!tamada) return res.status(404).json({ message: 'Тамада не найден' });
        await tamada.update({ portfolio, cost ,name});
        res.status(200).json({ message: 'Тамада обновлён', tamada });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTamada = async (req, res) => {
    const { id } = req.params;
    try {
        await File.destroy({ where: { tamada_id: id } });
        const deleted = await Tamada.destroy({ where: { id } });
        if (deleted) return res.status(204).send();
        res.status(404).json({ error: 'Тамада не найден' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};