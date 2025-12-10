const Reg = require('../models/Reg.model');
const catchAsync = require('../utils/catch-async.util');
const AppError = require('../utils/app-error.util');

exports.createUser = (role)=>{
    return catchAsync( async(req,res,next)=>{
        const {name,email,password}= req.body;

        if(!['admin','user'].includes(role)){
            return next(new AppError('Invalid Role',400))
        }
        const existing = await Reg.findOne({email});
        if(existing){
            return next(new AppError('Email Already Exist'))
        }
        const user = await Reg.create({name , email , password , role});
        res.status(201).json({message: 'User Created' , user})
    })
    }
    
exports.getUser = async (req,res) =>{
    const user = await Reg.find();
    res.status(201).json({message: 'List of Users' , data: user})
}

exports.getUsersById = async (req, res) => {
    try {
      const id = req.user.id;
      const user = await Reg.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      return res.status(200).json({
        message: "User retrieved successfully.",
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Server error while getting user.",
      });
    }
  };