//this will control all the operations associated with notes

//Dependencies 
var express= require("express");
var router = express.Router();
var models = require("../models");
var Article = models.Article;
var Note = models.Note;

//this will create a new note
router.post("/api/notes/:id", function(req, res){
	//create a new note and pass the req.body to the entry
	var newNote = new Note(req.body);
	//and now we save the new note to the db
	newNote.save(function(error, note){
		//logging errors
		if(error){
			console.log(error);

		}//otherwise
		else {
			//here we use the article id to find and update the notes
			Article.findOneAndUpdate(
				 {"_id": req.params.id},
				 {$push: {note: note._id } },
				 { safe: true, new : true}
				)
			//this will execute the above query 
			.exec(function(err, nt){
				//logging error
				if(err) {
					console.log(err);

				}//of return a note
				else{
					res.send(nt);
				}
			});
		}
	});
});

module.exports = router;

