'use strict';

var mongoose		= require('mongoose'),
	Schema			= mongoose.Schema;

var lieuSchema		= new Schema({

	name:{
		type: String,
		required: true,
		unique : true,
		dropDups: true
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
	geoCoords:{ //coordonées on long et lat pour plus tard (avec gmaps par exemple)
		type: String
	},
	links :[{
		url: String,
		logo: String, 
		text: String,
	}]
});


module.exports = mongoose.model('lieu', lieuSchema);