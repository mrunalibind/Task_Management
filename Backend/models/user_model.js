let mongoose=require("mongoose");

let userSchema=mongoose.Schema({
    name:String,
    team:String,
    role:{type:String,default:"User",enum:["User","Admin"]},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true}
});

let UserModel=mongoose.model("user",userSchema);
module.exports={UserModel};