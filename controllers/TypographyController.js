const Typography = require('../models/Typography');

exports.createTypography = async (req, res) => {
    console.log('create Typography', req.body);
    const { companyName, phone, link } = req.body;
    
    try {
        const typography = await Typography.create({
            companyName: companyName,
            phone: phone,
            link: link
        });

        res.status(201).json(typography);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTypographies = async (req, res) => {
    console.log('GetAllTypographies started!');
    
    try {
        const typographies = await Typography.findAll();
        res.status(200).json(typographies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTypographyById = async (req, res) => {
    const { id } = req.params;
    console.log('id from params = ', id);

    try {
        const typography = await Typography.findByPk(id);

        if (!typography) {
            return res.status(404).json({ message: 'Типография с данным id не найдена' });
        }

        res.status(200).json(typography);
    } catch (error) {
        console.error('Ошибка при получении типографии:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateTypography = async (req, res) => {
    const { id } = req.params;
    const { companyName, phone, link } = req.body;

    if (!companyName || !phone) {
        return res.status(400).json({ message: 'Обязательные поля: companyName, phone' });
    }

    console.log('ID типографии для обновления:', id);
    console.log('Данные для обновления:', req.body);

    try {
        const typography = await Typography.findByPk(id);
        if (!typography) {
            return res.status(404).json({ message: 'Типография с указанным ID не найдена' });
        }

        await typography.update({
            companyName,
            phone,
            link
        });

        console.log('Обновлённая типография:', typography);
        res.status(200).json({
            message: 'Типография успешно обновлена',
            typography: typography,
        });
    } catch (error) {
        console.error('Ошибка при обновлении типографии:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTypography = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Typography.destroy({
            where: { id: id },
        });
        if (deleted) {
            return res.status(204).send();
        }
        res.status(404).json({ error: 'Typography not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

