'use strict';

var Admin				= require('./../models/admin'),
	Token				= require('rand-token'),
	bcrypt				= require('bcrypt-nodejs'),
	Q					= require('q'),
	SALT_WORK_FACTOR	= 10,
	verif				= require('./../lib/verif');


exports.isAllowed = function(req, res){
	var token = req.params.token;
	var login = req.params.login;
	var required = req.params.required;
	verif.rightsOK(token, login, required).then(function(isAllowed){
		if (isAllowed)
			res.json({'allowed' : true});
		else
			res.json({'allowed' : false});
	});
};

exports.newAdmin = function(req, res){
	var token = req.params.token;
	var login = req.params.login;
	verif.rightsOK(token, login, 1).then(function(isAllowed){
		if(isAllowed){
			var newAdmin = new Admin(req.body);
			newAdmin.save(function(err){
				if(err)
					res.send(err);
				else
					res.json({message: 'Admin created!'});
			});
		}else{
			res.json({error: 'not allowed'});
		}
	});
};

exports.whoAmI = function(req, res){
	var token = req.params.token;
	var login = req.params.login;
	Admin.findOne({name: login, token: token}, function(err, user){
		if(err)
			res.send(err);
		else
			res.json({user: user});
	});
};

/*
	verif, recois login+mdp , verifie l'existance en bdd, créer un token unique, renvoie token + date + id admin
*/
exports.verif = function(req, res){
/*	console.log("I'm here");
	console.log(req.body);
	var adm = new Admin();
	adm.name = "root";
	adm.statut = 0;
	adm.password = "4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2";
	adm.save(function(err){
		console.log("done!!");
	});
*/
var toVerif = req.body;
	Admin.findOne({name: toVerif.login}, function(err, user){
		if(err)
			res.send(err);
		if(user == null){
			console.log("no such user");
			res.json({error: "no such user."});
		}else{
			console.log("candidate pass: " + toVerif.password);
			user.comparePassword(toVerif.password, function(err, isMatch){
				if(err)
					res.send(err);
				if (isMatch){
					user.token = Token.generate(24);
					user.stats.nbVisits = user.stats.nbVisits + 1;
					user.save(function(err){
						if(err)
							res.send(err);
						res.json({user: user});
					});
				}else{
					console.log("compare failed.");
					res.json({error: "wrong password"});
				}
			});
		}
	});
};

exports.lsAdmins = function(req, res){
	var params = req.params;
	Admin.findOne({token: params.token, name: params.login}, function(err, admin){
		if (err)
			res.send(err);
		if (admin == null)
			res.json({error: "no such admin"});
		else if(admin.statut <= 1){
			Admin.find({}, function(err, admins){
				if (err)
					res.send(err);
				res.json({admins: admins});
			})
		}
		else
			res.json({error: "not enough rights."});
	});

};

exports.supprAdmin = function(req, res){
	var params = req.params;
	var adminDel = req.body;
	Admin.findOne({token: params.token, name: params.login}, function(err, admin){
		if(err)
			res.send(err);
		if(admin == null)
			res.json({error: "no such admin"});
		else if (admin.statut <= 0){
			Admin.find({"name": adminDel.name}).remove(function(err, data){
				if(err)
					res.send(err);
				res.json(data);
			});
		}
	});
};

exports.edit = function(req, res){
	var token = req.params.token;
	var login = req.params.login;
	var admin = req.body;
	verif.rightsOK(token, login, 0).then(function(ret){
		if (!ret)
			res.json({error: "not enough rights"});
		verif.passOK(token, login, admin.passVerif).then(function(ret){
			if (!ret)
				res.json({error: "wrong password"});
			else{
				Admin.findOne({name: admin.name}, function(err, root){
					if(err)
						res.send(err);
					if(!!admin.newPass)
						root.password = admin.newPass;
					root.mail = admin.mail;
					root.statut = admin.statut;
					root.save(function(err){
						if(err)
							res.send(err);
						res.json({message: "update accepted."});
					})
				});
			}
		});
	});
}
