const TechnicalEquipmentRental = require('../models/TechnicalEquipmentRental');




exports.createTechnicalEquipmentRental = async (req, res) => {
    const { companyName, phone, link } = req.body;
    console.log('companyName, phone, link. =. ',   companyName, phone, link)

    // Обрезаем пробелы
    const trimmedLink = link?.trim();

    try {
        const technicalEquipmentRental = await TechnicalEquipmentRental.create({
            companyName,
            phone,
            link: trimmedLink
        });

        res.status(201).json(technicalEquipmentRental);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getAllTechnicalEquipmentRentals = async (req, res) => {
    console.log('GetAllTechnicalEquipmentRentals started!');
    
    try {
        const technicalEquipmentRentals = await TechnicalEquipmentRental.findAll();
        res.status(200).json(technicalEquipmentRentals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTechnicalEquipmentRentalById = async (req, res) => {
    const { id } = req.params;
    console.log('id from params = ', id);

    try {
        const technicalEquipmentRental = await TechnicalEquipmentRental.findByPk(id);

        if (!technicalEquipmentRental) {
            return res.status(404).json({ message: 'Аренда технического оснащения с данным id не найдена' });
        }

        res.status(200).json(technicalEquipmentRental);
    } catch (error) {
        console.error('Ошибка при получении аренды технического оснащения:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateTechnicalEquipmentRental = async (req, res) => {
    const { id } = req.params;
    const { companyName, phone, link } = req.body;

    if (!companyName || !phone) {
        return res.status(400).json({ message: 'Обязательные поля: companyName, phone' });
    }

    console.log('ID аренды технического оснащения для обновления:', id);
    console.log('Данные для обновления:', req.body);

    try {
        const technicalEquipmentRental = await TechnicalEquipmentRental.findByPk(id);
        if (!technicalEquipmentRental) {
            return res.status(404).json({ message: 'Аренда технического оснащения с указанным ID не найдена' });
        }

        await technicalEquipmentRental.update({
            companyName,
            phone,
            link
        });

        console.log('Обновлённая аренда технического оснащения:', technicalEquipmentRental);
        res.status(200).json({
            message: 'Аренда технического оснащения успешно обновлена',
            technicalEquipmentRental: technicalEquipmentRental,
        });
    } catch (error) {
        console.error('Ошибка при обновлении аренды технического оснащения:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTechnicalEquipmentRental = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await TechnicalEquipmentRental.destroy({
            where: { id: id },
        });
        if (deleted) {
            return res.status(204).send();
        }
        res.status(404).json({ error: 'TechnicalEquipmentRental not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

