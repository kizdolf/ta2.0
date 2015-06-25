'use strict';

var	Artiste		= require('./../models/artiste'),
	Verif		= require('./../lib/lib'),
	Help		= require('./../lib/helpers'),
	rmrf		= require('rimraf'),
	mkdir		= require('mkdirp');

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

exports.ls = function(req, res){
	Help.tokLog(req.params, function(err, result){
		if(err) res.json({error: err});
		Verif.rightsOK(result.token, result.login, 1)
		.then(function(isAllowed){
			if(!isAllowed) res.json({error: 'not enough rights'});

			Artiste.find({}, function(err, artistes){
				if(err) res.json({error: err});
				res.json({artistes: artistes});
			});
		});
	});
};

exports.delete = function(req, res){
	var token = req.params.token;
	var login = req.params.login;
	var obj = req.body;
	Verif.rightsOK(token, login, 1).then(function(isAllowed){
		if (isAllowed) {
			Verif.passOK(token, login, obj.pass).then(function(ok){
				if(ok){
					var path = __dirname + '/../../statics/pictures/artistes/'+ obj.id;
					rmrf(path, function(err){ if(err)	res.send(err);	});
					Artiste.findOne({_id: obj.id}).remove(function(err, data){
						if(data == 1)
							res.json({message: "Artiste removed."});
						else
							res.json({error: "remove failed."});
					});
				}else{
					res.json({error: "wrong password"});
				}
			});
		}else{
			res.json({error: "not enough rights"});
		}
	});
};
