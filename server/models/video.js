'use strict';

var mongoose		= require('mongoose'),
	Schema			= mongoose.Schema,
	Artiste			= require('./artiste'),
	Lieu			= require('./lieu'),
	Q				= require('q'),
	plateforms		= ['youtube', 'vimeo'];

var videoSchema		= new Schema({
	date: {
		type: Date,
		default: new Date()
	},
	datePubli:{
		type: Date,
		default: new Date()
	},
	artiste:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'artiste'
	},
	lieu:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'lieu'	
	},
	text:{
		type: String
	},
	category:{
		type: String,
		required: true
	},
	name:{
		type: String,
		required: true
	},
	plateform:{
		type: String,
		enum: plateforms,
		url: String,
		required: true
	},
	link:{
		type: String,
		required: true
	},
	weekly:{
		type: Boolean,
		default: false
	}

});

videoSchema.methods.post = function(cb){
	var idArtiste = this.artiste;
	Lieu.findOne({_id: this.lieu}, function (err, lieu){
		if(err)
			return cb(err);
		Artiste.findOne({_id: idArtiste}, function (err, artiste){
			if (err)
				return cb(err);
			cb(lieu, artiste);
		});
	});
}
/*

Methodes à rajouter: 
avoir l'artiste depuis la vidéo
avoir le lieu depuis la vidéo

*/

module.exports		= mongoose.model('video', videoSchema);