const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    desc:{
        type: String,
    },
    phone:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    img:{
        type: String,
        require: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Restaurant' , restaurantSchema);