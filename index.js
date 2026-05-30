const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db.config');
const path = require('path');
const app = express();

const corsMiddleware = require('./middlewares/cors.middleware');
const globalErrorHandler = require('./middlewares/globalError.middleware');
const AppError = require('./utils/app-error.util');

app.use(corsMiddleware);
app.use(express.json());
// app.use('/uploads' , express.static(path.join(__dirname , './uploads')))

connectDB();

app.use('/registration', require('./routes/Reg.route'));
app.use('/login', require('./routes/Login.route'));
app.use('/category', require('./routes/Category.route'));
app.use('/restaurant', require('./routes/Restaurant.route'));
app.use('/item', require('./routes/Item.route'));

// 404 Handler - This should be after all routes
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware - This should be last
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server Started at port ${PORT}`));