'use strict';

angular.module('adminTA.routes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){

	$routeProvider.when('/', {
		templateUrl: 'views/app.html',
		controller : 'appCtrl'
	});

	$routeProvider.when('/login', {
		templateUrl: 'views/login.html',
		controller : 'loginCtrl'
	});
	
	$routeProvider.when('/gestion', {
		templateUrl: 'views/gestion.html',
		controller : 'gestionCtrl'
	});

	$routeProvider.when('/profil', {
		templateUrl: 'views/profil.html',
		controller : 'profilCtrl'
	});

	$routeProvider.when('/new/quartier', {
		templateUrl: 'views/quartier.html',
		controller : 'quartierCtrl'
	});

	$routeProvider.when('/new/post', {
		templateUrl: 'views/post.html',
		controller : 'postCtrl'
	});

	$routeProvider.when('/edit/quartier/:id?', {
		templateUrl: 'views/editQuartier.html',
		controller : 'editQuartierCtrl'
	});

	$routeProvider.otherwise({
		redirectTo: '/'
	});

}]);