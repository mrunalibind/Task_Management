let mongoose=require("mongoose");

let taskSchema=mongoose.Schema({
    title:String,
    task:String,
    userId:String,
});

let TaskModel=mongoose.model("task",taskSchema);
module.exports={TaskModel};