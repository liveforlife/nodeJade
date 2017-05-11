/**
 * New node file
 */
var entries=[
            {"id":1,"title":"第一篇","body":"正文","pushines":"6/6"},
            {"id":2,"title":"第一篇","body":"正文","pushines":"6/6"},
            {"id":3,"title":"第一篇","body":"正文","pushines":"6/6"},
            {"id":4,"title":"第一篇","body":"正文","pushines":"6/6"},
            {"id":5,"title":"第一篇","body":"正文","pushines":"6/6"},
            {"id":6,"title":"第一篇","body":"正文","pushines":"6/6"},
            {"id":7,"title":"第一篇","body":"正文","pushines":"6/6"},
            {"id":8,"title":"第一篇","body":"正文","pushines":"6/6"},
            {"id":9,"title":"第一篇","body":"正文","pushines":"6/6"}
];
exports.getBlogEntries=function(){
	return entries;
}
exports.getBlogEntry=function(id){
	console.log(id);
	for(var i=0;i<entries.length;i++){
		if(entries[i].id == Number(id)){
			return entries[i];
			console.log("1");
		}else{
			console.log("2");
		}
	}
}