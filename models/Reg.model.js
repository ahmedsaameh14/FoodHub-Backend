const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const regSchema = new mongoose.Schema({
    name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user' , 'admin'],
    default: 'user'
  },
},
{ timestamps:true });

regSchema.pre('save' , async function(next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password , 10);      
    next();
})

regSchema.methods.correctPassword = async function(inputPassword){      
    return await bcrypt.compare(inputPassword , this.password);
}

module.exports = mongoose.model('Reg' , regSchema);

