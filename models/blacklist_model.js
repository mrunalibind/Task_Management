let mongoose=require("mongoose");

let blacklistSchema=mongoose.Schema({
    token:String
});

let BlacklistModel=mongoose.model("blacklist",blacklistSchema);
module.exports={BlacklistModel};