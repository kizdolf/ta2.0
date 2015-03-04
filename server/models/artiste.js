'use strict';

var mongoose		= require('mongoose'),
	Schema			= mongoose.Schema;

var artisteSchema	= new Schema({

	name:{
		type: String,
		required: true
	},
	text:{
		type: String
	},
	pathPicsFront:{
		type: String
	},
	pathPicsBack:{
		type: String
	},
	pics:[{
		type: String
	}],
	links :[{
		url: String,
		logo: String, 
		text: String,
	}]
});


module.exports		= mongoose.model('artiste', artisteSchema);