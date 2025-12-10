const mongoose = require('mongoose');
const connectDB = async() => {
    try{
    const conectionString = process.env.CONNECTION_STRING;
    const connection = await mongoose.connect(conectionString);
    console.log(`✅ Database Connected : ${connection.connection.host}`);
    
    }
    catch(err){
        console.log(`Database connection error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;