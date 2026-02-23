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

  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'   // 👈 reference Item model
    }
  ]
  
},
{ timestamps:true });

regSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
});

regSchema.methods.correctPassword = async function(inputPassword){      
    return await bcrypt.compare(inputPassword , this.password);
}

module.exports = mongoose.model('Reg' , regSchema);

