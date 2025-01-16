const mongoose = require("mongoose");
const userSchemma = new mongoose.Schema({
    username : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    profilePic : {type:String,default:""},
    followers: [{type:mongoose.Types.ObjectId,ref:"User"}],
    following: [{type:mongoose.Types.ObjectId,ref:"User"}],
});
module.exports = mongoose.model("User",userSchemma);