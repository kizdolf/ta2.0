'use strict';

var		Admin			= require('./../models/admin'),
		Lieu			= require('./../models/lieu'),
		Artiste			= require('./../models/artiste'),
		Q				= require('q'),
		Verif			= require('./lib'),
		mkdir			= require('mkdirp'),
		rmrf			= require('rimraf'),
		fs				= require('fs');

exports.rightsOK = function(token, login, right){
	var def = Q.defer();
	Admin.findOne({token: token, name: login}, function(err, admin){
		if(err || admin == null || admin.statut > right)
			def.resolve(false);
		else
			def.resolve(true);
	});

	return def.promise;
};

exports.passOK = function(token, login, pass){
	var def = Q.defer();
	Admin.findOne({token: token, name: login}, function(err, admin){
		if(err || admin == null)
			def.resolve(false);
		else{
			admin.comparePassword(pass, function(err, isMatch){
				if(err || !isMatch)
					def.resolve(false);
				else
					def.resolve(true);
			});
		}
	});
	return def.promise;
};


exports.addPicture = function(req, res){
	var fstream;
	var token = req.params.token;
	var login = req.params.login;
	var id = req.params.id;
	var type = req.params.type;
	var Model;
	Verif.rightsOK(token, login, 1).then(function(isAllowed){
		if(isAllowed){
			if(type == 'lieux')
				Model = Lieu;
			if(type == 'artistes')
				Model = Artiste;
			Model.findOne({_id: id}, function(err, model){
				console.log(model);
				if(err)
					res.send(err);
				var id = model.id;
				var nb = model.pics.length + 1;
				req.pipe(req.busboy);
				req.busboy.on('file', function (fieldname, file, filename){
					var ext = filename.split('.').pop();
					var path = __dirname + '/../../statics/pictures/' + type + '/' + id + '/' + nb + '.' + ext;
					fstream = fs.createWriteStream(path);
					model.pics.push('statics/pictures/' + type + '/' + id + '/' + nb + '.' + ext);
					file.pipe(fstream);
					fstream.on('close', function () {
						model.save(function(err){
							if(err)
								res.send(err);
							res.json({path: 'statics/pictures/' + type + '/' + id + '/' + nb + '.' + ext});
						}); //save
					});//stream
				});//on file
			});//fin model
		}//if 
	});//rights
}

exports.remPicture = function(req, res){
	var token = req.params.token;
	var login = req.params.login;
	var id = req.params.id;
	var pic = req.body.numPic;
	var type = req.params.type;
	var Model;
	Verif.rightsOK(token, login, 2).then(function(isAllowed){
		if(isAllowed){
			if(type == 'lieux')
				Model = Lieu;
			if(type == 'artistes')
				Model = Artiste;
			Model.findOne({_id: id}, function(err, model){
				if(err)
					res.send(err);
				var i = model.pics.indexOf(pic);
				var nbPic = pic.split('/').pop();
				model.pics.splice(i, 1);
				var path = __dirname + '/../../statics/pictures/' + type + '/'+ id + '/' + nbPic;
				rmrf(path, function(err){ if(err)	res.send(err);	});
				model.save(function(err, model){
					if(err)
						res.send(err)
					res.json({message: "Picture removed", model: model});
				});
			});
		}else{
			res.json({error: 'not enough rights'});
		}
	});

};