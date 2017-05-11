var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var userSchema=new Schema({
	name:{type:String},
	password:{type:Number},
});

var userBlog=mongoose.model("user",userSchema);

module.exports=userBlog;