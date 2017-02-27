//Required mongoose
var mongoose = require("mongoose");
//create a schema class
var Schema = mongoose.Schema;
//Create the Note Schema
var NoteSchema = new Schema({
	//create a string
	body: {
		type: String
	}
});
//Create the Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema, "Note");
//Export the Note model
module.exports = Note;