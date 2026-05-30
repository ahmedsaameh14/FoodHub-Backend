const Restaurant = require("../models/Restaurant.model");
const Category = require("../models/Category.model");
const mongoose = require("mongoose");
const catchAsync = require('../utils/catch-async.util');
const AppError = require('../utils/app-error.util');

// If Using name of Category not ID
exports.createRestaurant = catchAsync(async (req, res, next) => {
    const { name, desc, phone, address, category } = req.body;

    // Validation
    if (!name || !desc || !phone || !address || !category) {
        return next(new AppError('Please provide all required fields', 400));
    }

    if (!req.file) {
        return next(new AppError('Please upload an image', 400));
    }

    let categoryId = category;
    if (!mongoose.Types.ObjectId.isValid(category)) {
        const catDoc = await Category.findOne({ name: category });
        if (!catDoc) {
            return next(new AppError('Invalid category name', 400));
        }
        categoryId = catDoc._id;
    }

    const myRestaurant = await Restaurant.create({
        name,
        desc,
        phone,
        address,
        img: req.file.path,
        category: categoryId,
    });

    res.status(201).json({
        status: 'success',
        message: 'Restaurant Created',
        data: myRestaurant
    });
});

// Get All Res with Pagination
exports.getRestaurant = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        ...res.paginatedResult
    });
});

// Get Res by ID
exports.getRestaurantById = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid Restaurant ID', 400));
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
        return next(new AppError('Restaurant Not Found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Restaurant Data',
        data: restaurant
    });
});

// Get Related Restaurants
exports.getRelatedRestaurant = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid Restaurant ID', 400));
    }

    const restaurant = await Restaurant.where('_id').ne(id).limit(6);

    if (!restaurant || restaurant.length === 0) {
        return next(new AppError('No Related Restaurants Found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Related Restaurants Data',
        data: restaurant
    });
});

// Update Restaurant
exports.updateRestaurant = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid Restaurant ID', 400));
    }

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
        return next(new AppError('Restaurant Not Found', 404));
    }

    const { name, desc, phone, address, category } = req.body;

    // Handle image update if file was uploaded
    let img = restaurant.img;
    if (req.file) {
        img = req.file.path;
    }

    // Handle Category (string name or ID)
    let categoryId = category || restaurant.category;
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
        const catDoc = await Category.findOne({ name: category });
        if (!catDoc) {
            return next(new AppError('Invalid category name', 400));
        }
        categoryId = catDoc._id;
    }

    // Update Restaurant
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        id,
        {
            name: name || restaurant.name,
            desc: desc || restaurant.desc,
            phone: phone || restaurant.phone,
            address: address || restaurant.address,
            img,
            category: categoryId
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        status: 'success',
        message: 'Restaurant Updated',
        data: updatedRestaurant
    });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid Restaurant ID', 400));
    }

    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
        return next(new AppError('Restaurant Not Found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Restaurant Deleted Successfully',
        data: restaurant
    });
});
