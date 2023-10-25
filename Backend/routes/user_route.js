let express=require("express");
let userRouter=express.Router();
let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist_model");
const { UserModel } = require("../models/user_model");

userRouter.post("/register",async(req,res)=>{
    let {name,team,role,email,password}=req.body;
    try {
        let user=await UserModel.findOne({email});
        if(user){
            return res.status(400).send({msg:"User is already exist"});
        }
        let isTeamPresent=await UserModel.findOne({team})
        // console.log(isTeamPresent);
        if(role=="User" && isTeamPresent==null){
            return res.status(400).send({msg:"Admin is not created these Team"});
        }
        bcrypt.hash(password,5,async function(err,hash){
                let user=new UserModel({name,team,role,email,password:hash});
                await user.save();
                res.status(200).send({msg:"Register Successfull"});
        })
            
        
        
    } catch (error) {
        res.status(200).send({msg:error.message});
    }
});

userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    try {
        let user=await UserModel.findOne({email});
        if(!user){
            res.status(500).send({msg:"User is not exist"});
        }
        else{
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    bcrypt.compare(password, user.password, function(err, result) {
                        if(result){
                            var token = jwt.sign({ user }, process.env.token);
                            res.cookie("token",token);
                            res.status(200).send({msg:"Login Successfull",token});
                            
                        }
                        else{
                            res.status(400).send({msg:"Wrong credential"});
                        }
                    });
                }
                else{
                    res.status(400).send({msg:"Wrong credential"});
                }
            });
        }
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
});

userRouter.get("/logout",async(req,res)=>{
    try {
        let token=req.cookies.token;
        console.log(req.cookies);
        let blacklist=new BlacklistModel({token});
        await blacklist.save();
        res.status(200).send({msg:"Logout Successfull"});
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

module.exports={userRouter};