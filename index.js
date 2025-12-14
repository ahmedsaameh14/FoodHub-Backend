const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db.config');
const path = require('path');
const app = express();

app.use(express.json());
app.use('/uploads' , express.static(path.join(__dirname , './uploads')))


connectDB();

app.use('/registration' , require('./routes/Reg.route'))
app.use('/login' , require('./routes/Login.route'))


const PORT = process.env.PORT || 3000 ;
app.listen(PORT , () => console.log(`🚀 Server Started at port ${PORT}`));