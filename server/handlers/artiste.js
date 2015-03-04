'use strict';

var Lieu		= require('./../models/lieu'),
	Artiste		= require('./../models/artiste'),
	Video		= require('./../models/video'),
	Q			= require('q'),
	Verif		= require('./../lib/verif'),
	mkdir		= require('mkdirp'),
	rmrf		= require('rimraf'),
	fs			= require('fs');

exports.new = function(req, res){
	var token = req.params.token;
	var login = req.params.login;
	Verif.rightsOK(token, login, 1).then(function(isAllowed){
		if(isAllowed){
			var artiste = req.body;
			var newArtiste = new Artiste(artiste);
			newArtiste.save(function(err, artiste){
				if(err){
					res.send(err);
				}
				mkdir(__dirname + '/../../statics/pictures/artistes/'+ artiste.id, function(err){
					if(err)
						res.send(err);
					else{
						res.json({message: "Artiste saved", id : artiste.id});
					}
				});
			});
		}else{
			res.json({error: "not enough rights"});
		}
	});
};