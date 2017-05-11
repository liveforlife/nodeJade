
var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var userInfoSchema=new Schema({
	name:{type:String},
	img:{type:String},
	sex:{type:String},
	married:{type:String},
	experice:{type:String},
	introduce:{type:String},
});

var userInfoModel=mongoose.model('userInfo',userInfoSchema);

module.exports=userInfoModel;
