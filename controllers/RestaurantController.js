const { FLOAT } = require('sequelize');
const Restaurant  = require('../models/Restaurant');
const File =require('../models/File')
 exports.createRestaurant = async (req, res) => {
    console.log('create Restaurant',req.body)
    const { supplier_id,name, capacity, cuisine, averageCost,address,phone,district} = req.body;
    console.log(typeof(name), typeof(Number(capacity)), typeof(cuisine), 'averageCost',typeof(averageCost) ,averageCost,typeof(address),typeof(phone),typeof(district))
  
    try {
    const restaurant = await Restaurant.create({
      name: name,
      capacity: capacity,
      cuisine: cuisine,
      averageCost: Number(averageCost),
      address: address,
      phone: phone,
      district: district,
      supplier_id,supplier_id
    });

    res.status(201).json(restaurant);




    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};



// exports.getAllRestaurantById = async (req, res) => {

 
//   const { id } = req.params;
//   console.log('supplier_id from params = ', id);

//   try {
//     const restaurants = await Restaurant.findByPK({id})

//     console.log('Найденные рестораны:', restaurants);

//     if (!restaurants || restaurants.length === 0) {
//       return res.status(404).json({ message: 'Рестораны для данного supplier_id не найдены' });
//     }

//     res.status(200).json(restaurants);
//   } catch (error) {
//     console.error('Ошибка при получении ресторанов:', error);
//     res.status(500).json({ error: error.message });
//   }
// };


exports.getAllRestaurantByIdId = async (req, res) => {

  // const { id } = req.params;
  // console.log('id from params= ',id)
  // try {
  //   const Restaurants = await Restaurant.findAll();
  //   // console.log('res',Restaurants)
  //   let editingRestaurants
  //   if (Restaurant.id===id){
  //     console.log('output rest= ',Restaurant)
  //   }
  //   res.status(200).json(Restaurants);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
  const { id } = req.params;
  console.log('id from params = ', id);

  try {
    const restaurants = await Restaurant.findAll({
      where: { id: id },
    });

    // console.log('Найденные рестораны:', restaurants);

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ message: 'Рестораны с данным id не найдены' });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Ошибка при получении ресторанов:', error);
    res.status(500).json({ error: error.message });
  }

};
exports.deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    // Сначала удаляем связанные файлы
    await File.destroy({ where: { restaurant_id: id } });
    // Затем удаляем ресторан
    const deleted = await Restaurant.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    res.status(404).json({ error: 'Restaurant not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, capacity, cuisine, averageCost, address, phone, district, supplier_id } = req.body;

  if (!name || !capacity || !cuisine || !averageCost) {
    return res.status(400).json({ message: 'Обязательные поля: name, capacity, cuisine, averageCost' });
  }

  console.log('ID ресторана для обновления:', id);
  console.log('Данные для обновления:', req.body);

  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Ресторан с указанным ID не найден' });
    }

    await restaurant.update({
      name,
      capacity,
      cuisine,
      averageCost,
      address,
      phone,
      district,
      supplier_id,
    });

    console.log('Обновлённый ресторан:', restaurant);
    res.status(200).json({
      message: 'Ресторан успешно обновлён',
      restaurant: restaurant,
    });
  } catch (error) {
    console.error('Ошибка при обновлении ресторана:', error);
    res.status(500).json({ error: error.message });
  }
};




exports.getAllRestaurants = async (req, res) => {
  console.log('GetAllRestaurants started!')
  // const { id } = req.params;
  
  try {
    const Restaurants = await Restaurant.findAll();
    res.status(200).json(Restaurants);
    // console.log(Restaurants)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}