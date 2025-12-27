const Item = require('../models/Item.model');
const Restaurant = require('../models/Restaurant.model');


// Add Item To Restaurant
exports.addItemToRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, desc, price } = req.body;
    const img = req.file.filename;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant Not Found' });
    }

    const item = await Item.create({
      name,
      desc,
      price,
      img,
      restaurant: restaurantId
    });

    res.status(201).json({
      message: 'Item Added Successfully',
      data: item
    });

  } catch (err) {
    res.status(500).json({
      message: 'Failed to add item',
      error: err.message
    });
  }
};

// Get All Items in Restaurant
exports.getItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const items = await Item.find({ restaurant: restaurantId });

    res.status(200).json({
      message: 'Restaurant Items',
      data: items
    });

  } catch (err) {
    res.status(500).json({
      message: 'Failed to get Restaurant Items',
      error: err.message
    });
  }
};

// Get Item by ID
const Item = require('../models/Item.model');

exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id).populate('restaurant');

    if (!item) {
      return res.status(404).json({ message: 'Item Not Found' });
    }

    res.status(200).json({
      message: 'Item Data',
      data: item
    });

  } catch (err) {
    res.status(500).json({
      message: 'Failed to get Item',
      error: err.message
    });
  }
};

// Update Item
const Item = require('../models/Item.model');

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc, price } = req.body;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item Not Found' });
    }

    let img = item.img;
    if (req.file) {
      img = req.file.filename;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        name: name || item.name,
        desc: desc || item.desc,
        price: price || item.price,
        img
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Item Updated Successfully',
      data: updatedItem
    });

  } catch (err) {
    res.status(500).json({
      message: 'Failed to update Item',
      error: err.message
    });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item Not Found' });
    }

    await Item.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Item Deleted Successfully'
    });

  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete Item',
      error: err.message
    });
  }
};
