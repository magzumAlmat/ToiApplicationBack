const Transport = require('../models/Transport');
const File =require('../models/File')
exports.createTransport = async (req, res) => {
    const { salonName, address, phone, district, carName, color, brand ,supplier_id,cost} = req.body;
    try {
        const transport = await Transport.create({ salonName, address, phone, district, carName, color, brand,supplier_id,cost });
        res.status(201).json(transport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTransport = async (req, res) => {
    try {
        const transports = await Transport.findAll();
        res.status(200).json(transports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTransportById = async (req, res) => {
    const { id } = req.params;
    try {
        const transport = await Transport.findByPk(id);
        if (!transport) return res.status(404).json({ message: 'Транспорт не найден' });
        res.status(200).json(transport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTransport = async (req, res) => {
    const { id } = req.params;
    const { salonName, address, phone, district, carName, color, brand } = req.body;
    try {
        const transport = await Transport.findByPk(id);
        if (!transport) return res.status(404).json({ message: 'Транспорт не найден' });
        await transport.update({ salonName, address, phone, district, carName, color, brand });
        res.status(200).json({ message: 'Транспорт обновлён', transport });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTransport = async (req, res) => {
    const { id } = req.params;
    try {
        await File.destroy({ where: { transport_id: id } });
        const deleted = await Transport.destroy({ where: { id } });
        if (deleted) return res.status(204).send();
        res.status(404).json({ error: 'Транспорт не найден' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};