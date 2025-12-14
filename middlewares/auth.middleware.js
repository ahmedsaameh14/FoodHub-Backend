const jwt = require('jsonwebtoken');
const Reg = require('../models/Reg.model')

exports.authenticate = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader?.startsWith('Bearer')){
        return res.status(401).json({message:'No Token Provided'})
    }
    const token = authHeader.split(' ')[1];
    try {
        const decode = jwt.verify(token , process.env.JWT_SECRET)
        req.user = await Reg.findById(decode.id).select('-password');
        if(!req.user){
            return res.status(401).json({message: 'User Not Found'})
        }
        next();
    }
    catch(err) {
      return  res.status(403).json({message:'Token Invalid or Expired'})
    }
}