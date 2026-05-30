const category = require('../models/Category.model');
const catchAsync = require('../utils/catch-async.util');
const AppError = require('../utils/app-error.util');

exports.createCategory = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return next(new AppError('Category name is required', 400));
    }

    const cat = await category.create({ name });
    res.status(201).json({ 
        status: 'success',
        message: 'Category Created', 
        data: cat 
    });
});

exports.getCategory = catchAsync(async (req, res, next) => {
    const cat = await category.find();
    res.status(200).json({ 
        status: 'success',
        message: 'List of Categories', 
        data: cat 
    });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const cat = await category.findByIdAndDelete(id);

    if (!cat) {
        return next(new AppError('Category Not Found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Category Deleted Successfully',
        data: cat
    });
});
