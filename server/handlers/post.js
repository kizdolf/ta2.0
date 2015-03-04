'use strict';

var Lieu		= require('./../models/lieu'),
	Artiste		= require('./../models/artiste'),
	Video		= require('./../models/video'),
	Q			= require('q'),
	Verif		= require('./../lib/verif');

exports.new = function(req, res){
	var token = req.params.token;
	var login = req.params.login;
	Verif.rightsOK(token, login, 1).then(function(isAllowed){
		if(isAllowed){
			var d = new Date();
			var post = req.body;
			var video = new Video();
			var plateform;
			video.name = post.video.name;
			video.artiste = post.artiste.id;
			video.lieu = post.lieu.id;
			video.text = post.video.text;
			video.category = d.getFullYear();
			if (post.video.link.indexOf('youtube') != -1)
				plateform = 'youtube';
			else			
				plateform = 'vimeo';
			video.plateform = plateform;
			video.link = post.video.link;
			video.save(function(err, video){
				if(err){
					console.log(err);
					res.send(err);
				}
				video.post(function(l, a){
					res.json({message: "post saved", post:{video: video, artiste: a, lieu: l}});
				});
			});
		}
	});
};

/*
	Comments here cuz took me long to figure it out.
*/
exports.ls = function(req, res){
	var promises = [];
	var posts = [];
	Video.find({}).sort({date: -1}).exec(function (err, videos) { //get all videos sorted by date. Easy.
		videos.forEach(function (video){
			var d = Q.defer(); //creation of a promise for each video, 
			video.post(function(l, a){
				d.resolve({video: video, lieu: l, artiste: a}); //resolving the promise
			});
			promises.push(d.promise); //pushing the promise into a array
		});
		/*
		here promises is filled with promises. So we have a array of promises.
		and just we have to resolve them all.
		*/
		Q.all(promises).then(function(allPosts){
			res.json({posts: allPosts});
		});
	});
}