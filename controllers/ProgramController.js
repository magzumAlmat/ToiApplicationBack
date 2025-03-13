const Program = require('../models/Program');
const File =require('../models/File')
exports.createProgram = async (req, res) => {
    const { teamName, cost, type ,supplier_id} = req.body;
    try {
        const program = await Program.create({ teamName, cost, type,supplier_id });
        res.status(201).json(program);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.findAll();
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProgramById = async (req, res) => {
    const { id } = req.params;
    try {
        const program = await Program.findByPk(id);
        if (!program) return res.status(404).json({ message: 'Программа не найдена' });
        res.status(200).json(program);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProgram = async (req, res) => {
    const { id } = req.params;
    const { teamName, cost, type } = req.body;
    try {
        const program = await Program.findByPk(id);
        if (!program) return res.status(404).json({ message: 'Программа не найдена' });
        await program.update({ teamName, cost, type });
        res.status(200).json({ message: 'Программа обновлена', program });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProgram = async (req, res) => {
    const { id } = req.params;
    try {
        await File.destroy({ where: { program_id: id } });
        const deleted = await Program.destroy({ where: { id } });
        if (deleted) return res.status(204).send();
        res.status(404).json({ error: 'Программа не найдена' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};