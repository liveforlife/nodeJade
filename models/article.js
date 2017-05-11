var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var articleSchema=new Schema({
	articleName:{type:String},
	articleText:{type:String},
	articleTime:{type:String},
});

var articleBlog=mongoose.model("article",articleSchema);

module.exports=articleBlog;