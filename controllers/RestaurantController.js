const { FLOAT } = require('sequelize');
const Restaurant  = require('../models/Restaurant');

 exports.createRestaurant = async (req, res) => {
    console.log('create Restaurant',req.body)
    const { supplier_id,name, capacity, cuisine, averageCost,address,phone,district} = req.body;
    console.log(typeof(name), typeof(Number(capacity)), typeof(cuisine), typeof(averageCost),typeof(address),typeof(phone),typeof(district))
  
    try {
    const restaurant = await Restaurant.create({
      name: name,
      capacity: capacity,
      cuisine: cuisine,
      averageCost: averageCost,
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