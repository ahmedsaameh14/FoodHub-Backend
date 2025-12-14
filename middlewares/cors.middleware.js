const cors = require('cors');
const allowedOrigin = process.env.ALLOWED_ORIGIN?.split(',');

const corsOptions = {
    origin: function(origin,callback){
        if(!origin){
            return callback(null,true);
        }
        if(allowedOrigin.includes(origin)){
            return callback(null , true)
        }else{
            return callback(new Error('CORS Policy : Origin Not Allowed'))
        }
    },
    credential:true,
    methods:['GET' , 'POST' , 'DELETE' , 'PUT'],
    allowedHeaders:['Content-Type' , 'Authorization']
};
module.exports= cors(corsOptions);