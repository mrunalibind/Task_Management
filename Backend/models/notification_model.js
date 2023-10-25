let mongoose=require("mongoose");

let notificationSchema=mongoose.Schema({
    senderId:Number,
    msg:String
});

let NotificationModel=mongoose.model("notification",notificationSchema);
module.exports={NotificationModel};