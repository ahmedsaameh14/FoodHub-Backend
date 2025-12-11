const Reg = require('../models/Reg.model');
const jwt = require('jsonwebtoken');

const signToken = (user)=>{
    return jwt.sign({id: user._id,role:user.role, name:user.name},      // Token Will Carry This Data
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '1d'}
    )           
}

exports.login = async (req,res)=>{
    const {email , password} = req.body;
    const user = await Reg.findOne({email});
    if(!user || !(await user.correctPassword(password))){
        return res.status(401).json({message:"Email or Password invalid"})
    }
    const token = signToken(user);

    return res.status(200).json({message: "You are LogedIn" , token});
}