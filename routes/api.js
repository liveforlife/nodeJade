/**
 * New node file
 */
exports.index=function(req,res){
	res.setHeader("Access-Control-Allow-Origin", "http://172.20.11.253:9000");  
	  res.json(200,{name:"张三",age:40});
};
