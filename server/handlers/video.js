'use strict';

var	Video		= require('./../models/video'),
	Verif		= require('./../lib/lib'),
	Help		= require('./../lib/helpers');


exports.ls = function(req, res){
	Help.tokLog(req.params, function(err, result){
		if(err) res.json({error: err});
		Verif.rightsOK(result.token, result.login, 1)
		.then(function(isAllowed){
			if(!isAllowed) res.json({error: 'not enough rights'});

			Video.find({}, function(err, videos){
				if(err) res.json({error: err});
				res.json({videos: videos});
			});
		});
	});
};
