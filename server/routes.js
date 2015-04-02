'use strict';

var express		= require('express');

module.exports = (function(){

var	Admins				= require('./handlers/admin'),
	Quartiers			= require('./handlers/quartier'),
	Post				= require('./handlers/post'),
	Artiste				= require('./handlers/artiste'),
	Lib					= require('./lib/lib'),
	bcrypt				= require('bcrypt'),
	SALT_WORK_FACTOR	= 10;

var	router 				= express.Router();

router.use(function(req, res, next) {
	console.log(req.method + ' on ' + req.url);
	next();
});

router.route('/login')
	.post(Admins.verif);

router.route('/admins/:token/:login')
	.get(Admins.lsAdmins)
	.post(Admins.supprAdmin)
	.put(Admins.edit);

router.route('/allowed/:token/:login/:required')
	.get(Admins.isAllowed);

router.route('/newAdmin/:token/:login')
	.post(Admins.newAdmin);

router.route('/me/:token/:login')
	.get(Admins.whoAmI);

router.route('/artiste/:token/:login')
	.post(Artiste.new);

router.route('/post/:token/:login')
	.post(Post.new);

router.route('/posts')
	.get(Post.ls);

router.route('/quartier/:token/:login')
	.post(Quartiers.new)
	.get(Quartiers.ls)
	.patch(Quartiers.delete)
	.put(Quartiers.modif);

router.route('/pictures/:type/:id/:token/:login')
	.post(Lib.addPicture)
	.patch(Lib.remPicture);

	return router;
})();