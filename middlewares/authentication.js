// Authentication Midlleware, to access the task routes, user should be logged in

let jwt=require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist_model");

let authentication=async(req,res,next)=>{
    
    let token=req.cookies.token;
    let isBlacklist=await BlacklistModel.findOne({token});
    if(isBlacklist){
        return res.status(400).send({msg:"Already logout, Login Again"})
    }
    jwt.verify(token, process.env.token, function(err, decoded) {
        if(decoded){
            req.body.userId=decoded.user._id;
            next();
        }
        else{
            res.status(500).send({msg:err});
        }
        
    });
      
}
module.exports={authentication};