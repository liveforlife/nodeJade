var express = require('express');
var router = express.Router();
var api  =require('../routes/api');
var blogEngine=require('../json/blog.js');
var articleBlog=require('../models/article.js');
var userInfoModel=require('../models/userInfo.js');
var dbBlog=require('../models/blog.js');
var stutas=0;
var userName='';
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(userName);
	if(stutas==0){
		//res.render('index', { userName:userName,stutas:0});
		res.redirect('/login');
	}else{
		res.render('index', {  userName:userName,stutas:1 });
	}
	//res.redirect("/hello/anime");
});

//router.get('/api',api.index);

router.post('/login',function(req,res){
	console.log(req.body.username+','+req.body.password);
	//var user={name:'admin',password:'111111'};
	dbBlog.findOne({name:req.body.username}, function(err, doc) {
		if(doc){
			console.log(doc.password);
			if(doc.password==req.body.password){
				stutas=1;
				userName=req.body.username;
				return res.redirect('/');
			}else{
				res.render('login',{tips:'密码不对，请重新输入'});
			}
		}else{
			res.render('login',{tips:'没有这个人，请先注册'});
		}
	});
});
router.get('/loginOut',function(req,res){
	stutas=0;
	return res.redirect('/');
});

router.get('/login',function(req,res,next){
	//res.render('login',{ title: 'Express'});
	res.render('login',{tips:'请输入你的账号和密码'});
});

router.get('/register',function(req,res,next){
	res.render('register',{tips:'请输入你的需要注册的账号和密码'});
});
router.post('/register',function(req,res,next){
	var userInfo={
			'name':req.body.username,
			'password':req.body.password
	};
	dbBlog.findOne({name:req.body.username},function(err,doc){
		if(doc){
			res.render('register',{tips:'账号名已存在'});
		}else{
			userBlogEntity=new dbBlog(userInfo);
			//console.log(userBlogEntity);
				userBlogEntity.save(function(err) {
					console.log(err);
					if(err!=null){
						console.log("2");
						return res.redirect('/register');
					}else{
						console.log("1");
						userName=req.body.username;
						stutas=1;
						return res.redirect('/');
					}
				});
		}
	});
	
});

router.get('/about',function(req,res){
	res.sendfile('./views/about.html');
	console.log("4");
});

router.get('/article/:name',function(req,res){
	console.log(req.params.name);
	var entry=articleBlog.findOne({articleName:req.params.name},function(err,doc){
		console.log(doc);
	});
	
});

router.get('/getArticle',function(req,res){
	articleBlog.find({},function(err,docs){
		if(docs){
			return res.json(JSON.stringify({data:docs,message:'success'}));
		}
	});
});

router.get('/article',function(req,res){
	res.render('article');
});

router.post('/article',function(req,res){
	var articleBlogEntity=new articleBlog(req.body);
	articleBlogEntity.save(function(err){
		if(err!=null){
			return res.redirect('/article');
		}else{
			return res.redirect('/');
		}
	});
});

router.get('/editArticle',function(req,res){
	res.render('editArticle',{articleName:req.query.articleName});
});

router.get('/editArticle.action',function(req,res){
	articleBlog.findOne({articleName:req.query.articleName},function(err,doc){
		return res.json(JSON.stringify({data:doc,message:'success'}));
	});
});

router.post('/editArticle.action',function(req,res){
	console.log(req.body.articleName);
	articleBlog.update({'articleName':req.body.articleName},{'$set':{'articleText':req.body.articleText,'articleTime':req.body.articleTime}},function(err){
		console.log(err);
		return res.json(JSON.stringify({message:'success'}));
	});
});

router.post('/delete',function(req,res){
	console.log(req.query.articleName);
	articleBlog.remove({articleName:req.query.articleName},function(err){
		return res.json(JSON.stringify({message:'success'}));
	});
});

router.get('/userInfo',function(req,res){
	console.log('333');
	res.render('userInfo',{'userName':userName});
});

router.post('/userInfo.action',function(req,res){
	console.log(req.body.username);
	userInfoModel.findOne({name:req.body.username},function(err,doc){
		console.log(doc);
		if(!doc){
			console.log('333');
			var user={
					name:req.body.username,
					img:'',
					sex:'',
					married:'',
					experice:'',
					introduce:''
			};
			var userInfoEntity=new userInfoModel(user);
			userInfoEntity.save(function(err){
				userInfoModel.findOne({name:req.body.username},function(err,doc){
					console.log(err);
					console.log(doc);
					res.json(JSON.stringify({message:'success',data:doc}));
				});
			});
			
		}else{
			console.log('222');
			res.json(JSON.stringify({message:'success',data:doc}));
		}
	});
});

router.get('/userInfoEdit',function(req,res){
	res.render('userInfoEdit',{'userName':userName});
});

router.post('/updateUserInfo.action',function(req,res){
	userInfoModel.update({'name':userName},{'$set':req.body},function(err){
		console.log(err);
		return res.json(JSON.stringify({message:'success'}));
	});
});
module.exports = router;
