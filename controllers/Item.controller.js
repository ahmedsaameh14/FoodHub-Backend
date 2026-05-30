const Item = require('../models/Item.model');
const Restaurant = require('../models/Restaurant.model');
const catchAsync = require('../utils/catch-async.util');
const AppError = require('../utils/app-error.util');

// Add Item To Restaurant
exports.addItemToRestaurant = catchAsync(async (req, res, next) => {
  const { name, desc, price, restaurantId } = req.body;

  // Validation
  if (!name || !desc || !price || !restaurantId) {
    return next(new AppError('Please provide name, description, price, and restaurantId', 400));
  }

  if (!req.file) {
    return next(new AppError('Please upload an image', 400));
  }

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    return next(new AppError('Restaurant Not Found', 404));
  }

  const item = await Item.create({
    name,
    desc,
    price,
    img: req.file.path,
    restaurant: restaurantId
  });

  res.status(201).json({
    status: 'success',
    message: 'Item Added Successfully',
    data: item
  });
});

// Get All Items in Restaurant
exports.getItemsByRestaurant = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
    return next(new AppError('Please provide restaurantId', 400));
  }

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    return next(new AppError('Restaurant Not Found', 404));
  }

  const items = await Item.find({ restaurant: restaurantId });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant Items',
    data: items
  });
});

// Get Item by ID
exports.getItemById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const item = await Item.findById(id).populate('restaurant');

  if (!item) {
    return next(new AppError('Item Not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Item Data',
    data: item
  });
});

// Update Item
exports.updateItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, desc, price } = req.body;

  const item = await Item.findById(id);
  if (!item) {
    return next(new AppError('Item Not Found', 404));
  }

  let img = item.img;
  if (req.file) {
    img = req.file.path;
  }

  const updatedItem = await Item.findByIdAndUpdate(
    id,
    {
      name: name || item.name,
      desc: desc || item.desc,
      price: price || item.price,
      img
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Item Updated Successfully',
    data: updatedItem
  });
});

// Delete Item
exports.deleteItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const item = await Item.findById(id);
  if (!item) {
    return next(new AppError('Item Not Found', 404));
  }

  await Item.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
    message: 'Item Deleted Successfully'
  });
});
