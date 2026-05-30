const Reg = require('../models/Reg.model');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catch-async.util');
const AppError = require('../utils/app-error.util');

const signToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
};

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const user = await Reg.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password))) {
        return next(new AppError('Email or Password invalid', 401));
    }

    const token = signToken(user);

    res.status(200).json({
        status: 'success',
        message: 'You are LoggedIn',
        token
    });
});