const Suvenirs = require('../models/Suvenirs');

// Получить все сувениры
exports.getAllSuvenirs = async (req, res) => {
    try {
        const suvenirs = await Suvenirs.findAll();
        res.status(200).json(suvenirs);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
};

// Получить сувенир по ID
exports.getSuvenirById = async (req, res) => {
    try {
        const suvenir = await Suvenirs.findByPk(req.params.id);
        if (!suvenir) {
            return res.status(404).json({ error: 'Сувенир не найден' });
        }
        res.status(200).json(suvenir);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
};

// Создать новый сувенир
exports.createSuvenir = async (req, res) => {
    console.log('я внутри создания сувенира!',req.body)
    const { salonName, address, phone, district, itemName, type,supplier_id,cost} = req.body;
    try {
        const newSuvenir = await Suvenirs.create({salonName, address, phone, district, itemName, type,supplier_id,cost});
        res.status(201).json(newSuvenir);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Обновить сувенир по ID
exports.updateSuvenir = async (req, res) => {
    try {
        const [updated] = await Suvenirs.update(req.body, {
            where: { id: req.params.id },
        });

        if (!updated) {
            return res.status(404).json({ error: 'Сувенир не найден' });
        }

        res.status(200).json({ message: 'Данные обновлены' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Удалить сувенир по ID
exports.deleteSuvenir = async (req, res) => {
    try {
        const deleted = await Suvenirs.destroy({
            where: { id: req.params.id },
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Сувенир не найден' });
        }

        res.status(200).json({ message: 'Сувенир удален' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении данных' });
    }
};