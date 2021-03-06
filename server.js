'use strict';

var express				= require('express'),
	app					= express(),
	bodyParser			= require('body-parser'),
	port				= process.env.PORT || 8080,
	router				= require('./server/routes'),
	mongoose   			= require('mongoose'),
	admin				= express(),
	path				= require('path'),
	busboy 				= require('connect-busboy');

mongoose.connect('mongodb://localhost/data'); // connect to our database A TESTER POUR LES DEUX APPELS
app.use('/statics', express.static(__dirname + '/statics'))
.use('/', express.static(__dirname + '/app'))

.use(bodyParser.urlencoded({extended: true	}))
.use(bodyParser.json())
.use(busboy())
.use('/api', router)

.use('/admin', admin)
.use('/',express.static(__dirname + '/app'))
.listen(port);


admin.use('/statics', express.static(__dirname + '/statics'))
.use('/', express.static(__dirname + '/admin'))
.use(busboy())
.use(bodyParser.urlencoded({extended: true}))
.use(bodyParser.json());

console.log('port used : ' + port);
