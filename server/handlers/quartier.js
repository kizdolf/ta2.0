'use strict';

var Lieu		= require('./../models/lieu'),
	Q			= require('q'),
	Verif		= require('./../lib/lib'),
	mkdir		= require('mkdirp'),
	rmrf		= require('rimraf'),
	fs			= require('fs');

exports.ls = function(req, res){

	var token = req.params.token;
	var login = req.params.login;
	Verif.rightsOK(token, login, 2).then(function(isAllowed){
		if(isAllowed){
			Lieu.find({}, function(err, lieux){
				if(err)
					res.send(err);
				res.json({lieux: lieux});
			});
		}else{
			res.json({error: "error with rights."});
		}
	});
};

exports.modif = function(req, res){
	var token = req.params.token;
	var login = req.params.login;
	var obj = req.body;
	Verif.rightsOK(token, login, 2).then(function(isAllowed){
		if(isAllowed){
			Lieu.findOne({_id: obj.id}, function (err, lieu) {
				if(err || lieu == null)
					res.send(err);
				lieu.name = obj.name;
				lieu.text = obj.text;
				lieu.save(function(err, ret){
					if(err)
						res.send(err);
					res.json({message: "edit done"});
				});
			});
		}else{
			res.json({error: "not enough rights"});
		}
	});
};

/*
Doit trouver les videos associés et les tags 'sans quartier'
*/
exports.delete = function(req, res){
	var token = req.params.token;
	var login = req.params.login;
	var obj = req.body;
	Verif.rightsOK(token, login, 1).then(function(isAllowed){
		if (isAllowed) {
			Verif.passOK(token, login, obj.pass).then(function(ok){
				if(ok){
					var path = __dirname + '/../../statics/pictures/lieux/'+ obj.id;
					rmrf(path, function(err){ if(err)	res.send(err);	});
					Lieu.findOne({_id: obj.id}).remove(function(err, data){
						if(data == 1)
							res.json({message: "Lieu removed."});
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

exports.new = function(req, res){
	var token = req.params.token;
	var login = req.params.login;
	Verif.rightsOK(token, login, 1).then(function(isAllowed){
		if(isAllowed){
			var lieu = req.body;
			var newLieu = new Lieu(lieu);
			newLieu.save(function(err, lieu){
				if(err){
					res.send(err);
				}
				mkdir(__dirname + '/../../statics/pictures/lieux/'+ lieu.id, function(err){
					if(err)
						res.send(err);
					else{
						res.json({message: "Lieu saved", id : lieu.id});
					}
				});
			});
		}else{
			res.json({error: "not enough rights"});
		}
	});
};
