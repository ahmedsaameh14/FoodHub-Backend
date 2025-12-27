const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    desc:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    img:{
        type: String,
        require: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
  }
});

module.exports = mongoose.model('Item' , itemSchema);