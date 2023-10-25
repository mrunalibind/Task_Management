let express=require("express");
const { TaskModel } = require("../models/task_model");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
let taskRouter=express.Router();

// Post Request, create tasks
taskRouter.post("/create",authentication,async(req,res)=>{
    let {title,task,userId}=req.body;
    try {
        let newtask=new TaskModel({title,task,userId});
        await newtask.save();
        res.status(200).send({msg:"Task is created"});
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})


// Get Request, retrieve all tasks
taskRouter.get("/retrieve",authentication,async(req,res)=>{
    try {
        let tasks=await TaskModel.find();
        res.status(200).send({msg:tasks});
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

// Patch request, update a particular task by passing id on param
taskRouter.patch("/create/:id",authentication,authorization(["User","Admin"]),async(req,res)=>{
    let {id}=req.params;
    let {title,task,userId}=req.body;
    try {
        await TaskModel.findByIdAndUpdate({_id:id},title,task,userId);
        res.status(200).send({msg:"Task Updated"});
        
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})

// Delete request, delete a particular task by passing id
taskRouter.delete("/remove/:id",authentication,authorization(["User","Admin"]),async(req,res)=>{
    let {id}=req.params;
    try {
        await TaskModel.findByIdAndDelete({_id:id});
        res.status(200).send({msg:"Task Deleted"});
    } catch (error) {
        res.status(500).send({msg:error.message});
    }
})


module.exports={taskRouter};