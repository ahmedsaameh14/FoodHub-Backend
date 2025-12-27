const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db.config');
const path = require('path');
const app = express();

const corsMiddleware = require('./middlewares/cors.middleware');
app.use(corsMiddleware);

app.use(express.json());
app.use('/uploads' , express.static(path.join(__dirname , './uploads')))


connectDB();

app.use('/registration' , require('./routes/Reg.route'))
app.use('/login' , require('./routes/Login.route'))
app.use('/category' , require('./routes/Category.route'))
app.use('/restaurant' , require('./routes/Restaurant.route'))
app.use('/item' , require('./routes/Item.route'))


const PORT = process.env.PORT || 3000 ;
app.listen(PORT , () => console.log(`🚀 Server Started at port ${PORT}`));