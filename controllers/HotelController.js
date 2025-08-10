const Hotel = require('../models/Hotel');

exports.createHotel = async (req, res) => {
    console.log('create Hotel', req.body);
    const { name, address, averageCheck, phone, link } = req.body;

    const checkValue = Number(averageCheck);
    if (isNaN(checkValue)) {
        return res.status(400).json({ error: 'averageCheck должен быть числом.' });
    }
    
    try {
        const hotel = await Hotel.create({
            name: name,
            address: address,
            averageCheck: checkValue,
            phone: phone,
            link: link
        });

        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllHotels = async (req, res) => {
    console.log('GetAllHotels started!');
    
    try {
        const hotels = await Hotel.findAll();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHotelById = async (req, res) => {
    const { id } = req.params;
    console.log('id from params = ', id);

    try {
        const hotel = await Hotel.findByPk(id);

        if (!hotel) {
            return res.status(404).json({ message: 'Гостиница с данным id не найдена' });
        }

        res.status(200).json(hotel);
    } catch (error) {
        console.error('Ошибка при получении гостиницы:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateHotel = async (req, res) => {
    const { id } = req.params;
    const { name, address, averageCheck, phone, link } = req.body;

    if (!name || !address || !averageCheck || !phone) {
        return res.status(400).json({ message: 'Обязательные поля: name, address, averageCheck, phone' });
    }

    const checkValue = Number(averageCheck);
    if (isNaN(checkValue)) {
        return res.status(400).json({ error: 'averageCheck должен быть числом.' });
    }

    console.log('ID гостиницы для обновления:', id);
    console.log('Данные для обновления:', req.body);

    try {
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Гостиница с указанным ID не найдена' });
        }

        await hotel.update({
            name,
            address,
            averageCheck: checkValue,
            phone,
            link
        });

        console.log('Обновлённая гостиница:', hotel);
        res.status(200).json({
            message: 'Гостиница успешно обновлена',
            hotel: hotel,
        });
    } catch (error) {
        console.error('Ошибка при обновлении гостиницы:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Hotel.destroy({
            where: { id: id },
        });
        if (deleted) {
            return res.status(204).send();
        }
        res.status(404).json({ error: 'Hotel not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

