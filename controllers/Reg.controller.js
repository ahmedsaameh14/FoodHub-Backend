const Reg = require('../models/Reg.model');
const catchAsync = require('../utils/catch-async.util');
const AppError = require('../utils/app-error.util');

exports.createUser = (role) => {
    return catchAsync(async (req, res, next) => {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return next(new AppError('Please provide name, email, and password', 400));
        }

        if (!['admin', 'user'].includes(role)) {
            return next(new AppError('Invalid Role', 400));
        }

        const existing = await Reg.findOne({ email });
        if (existing) {
            return next(new AppError('Email Already Exist', 400));
        }

        const user = await Reg.create({ name, email, password, role });
        res.status(201).json({
            status: 'success',
            message: 'User Created',
            user
        });
    });
};

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await Reg.find();
    res.status(200).json({
        status: 'success',
        message: 'List of Users',
        data: user
    });
});

exports.getUserById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const user = await Reg.findById(id);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    return res.status(200).json({
        status: 'success',
        message: 'User retrieved successfully',
        data: user
    });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const user = await Reg.findByIdAndDelete(id);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
        deletedUser: user
    });
});

// Favourite Section 

exports.toggleFavouriteItem = catchAsync(async (req, res, next) => {
    const userId = req.user.id; // from authenticate middleware
    const itemId = req.params.itemId; // item id

    const user = await Reg.findById(userId);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const isExist = user.favourites.includes(itemId);

    if (isExist) {
        user.favourites.pull(itemId); // remove
    } else {
        user.favourites.push(itemId); // add
    }

    await user.save();

    res.status(200).json({
        status: 'success',
        message: isExist
            ? 'Item removed from favourites'
            : 'Item added to favourites',
        favourites: user.favourites
    });
});

exports.getMyFavouriteItems = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const user = await Reg.findById(userId).populate('favourites');

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        status: 'success',
        favourites: user.favourites
    });
});