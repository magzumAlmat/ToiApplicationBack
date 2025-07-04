const Cakes = require('../models/Cakes');
const File =require('../models/File')

exports.createCake = async (req, res) => {
    
    const {  address, phone, district, cakeType, cost ,supplier_id,name } = req.body;
    try {
        const cake = await Cakes.create({  address, phone, district, cakeType, cost ,supplier_id,name});
        res.status(201).json(cake);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllCakes = async (req, res) => {
    console.log('Get cakes started')
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
    const { name, address, phone, district, cakeType, cost } = req.body;
    try {
        const cake = await Cakes.findByPk(id);
        if (!cake) return res.status(404).json({ message: 'Торт не найден' });
        await cake.update({ name, address, phone, district, cakeType, cost });
        res.status(200).json({ message: 'Торт обновлён', cake });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCake = async (req, res) => {
    const { id } = req.params;
    try {
        await File.destroy({ where: { cake_id: id } });
        const deleted = await Cakes.destroy({ where: { id } });
        if (deleted) return res.status(204).send();
        res.status(404).json({ error: 'Торт не найден' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};