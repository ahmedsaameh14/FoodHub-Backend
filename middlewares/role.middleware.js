exports.authorize = (...allowedRoles)=>{
    return(req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:'Access denied: not allowed role'})
        }
        next();
    }
}