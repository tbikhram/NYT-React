//the Dependencies
var express = require("express");
var router = express.Router();
var models = require("../models");
var Article = models.Article;
var Note = models.Note;
var mongoose = require("mongoose");

//Routes

//MAIN "/" route
//This will redirect the user to the rendered React app
router.get("/", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
});

//this route will receive the GET request and send the articles that are stored in the db.
//it will me called when the page gets rendered
router.get("/api/saved", function(req,res){
	//this will find all the records, and sort them in descending order, with a limit of 10
		Article.find({}).sort([
			["date", "descending"]
			]).limit(10).populate("note").exec(function(err, articles){
				if(err) throw err;
				res.send(articles);
			});
});

//this will be the POST request route and it will store the articles into the db
router.post("/api/saved", function(req,res){
	var entry = new Article({title:req.body.title,url:req.body.url,date:Date.now()});
	//here we save the articles to the db
		entry.save(function(err, doc){
			//logging errors
			if(err){
				console.log(err);

			}else{
				res.json(doc);
			}
		});
});

//this route will receive the Delete request and remove the article from the db
router.delete("/api/saved", function(req, res){
	var articleId = mongoose.Types.ObejectId(req.body.articleId);
	Article.findOneAndRemove(
		  {"_id": articleId},
		  function(err, doc) {
		  	//logging errors
		  	if (err){
		  		console.log(err);

		  	}else{
		  		res.json(doc);
		  	}
		  }	
		);
	
});

module.exports = router;



























