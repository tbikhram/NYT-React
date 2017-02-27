//require mongoose
var mongoose = require("mongoose");
//create schema class
var Schema = mongoose.Schema;
//create article schema
var ArticleSchema = new Schema({
	//title is a required string 
	title: {
		type: String,
		required: true
	},
	//the url as a required string
	url: {
		type: String,
		unique: true,
		required: true
	},
	date: {
		type: Date
	},
	//this saves an array of notes ObjectId, ref refers to the Note model
	note: [{
		type: Schema.Types.ObjectId,
		ref: "Note"
	}]
});
//this creates the article model with the articleSchema
var Article = mongoose.model("Article", ArticleSchema, "Article");
//Export the model
module.exports= Article;