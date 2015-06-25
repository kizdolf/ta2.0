'use strict';

angular.module('adminTA.routes', ['ngRoute'])

.factory('authFilter', function ($window, localStorageService, $location) {

	var login = localStorageService.get('login');
	var date = localStorageService.get('date');
	var token = localStorageService.get('token');
	if(login === null || date === null || token === null)
		$window.location.href = '/admin/login.html';
	else
		$location.path('/app');
	return true;
})

.config(['$routeProvider', function($routeProvider){

	$routeProvider.when('/', {
		resolve: {authFilter: 'authFilter'}
	})
	.when('/app', {
		templateUrl: 'views/app.html',
		controller : 'appCtrl'
	})
	.when('/login', {
		resolve: {authFilter: 'authFilter'}
	})
	.when('/gestion', {
		templateUrl: 'views/gestion.html',
		controller : 'gestionCtrl'
	})
	.when('/profil', {
		templateUrl: 'views/profil.html',
		controller : 'profilCtrl'
	})
	.when('/new/quartier', {
		templateUrl: 'views/quartier.html',
		controller : 'quartierCtrl'
	})
	.when('/new/post', {
		templateUrl: 'views/post.html',
		controller : 'postCtrl'
	})

	.when('/edit/:type/:id?',{
		templateUrl: 'views/edit.html',
		controller: 'editCtrl'
	})

	.when('/edit/quartier/:id?', {
		templateUrl: 'views/editQuartier.html',
		controller : 'editQuartierCtrl'
	})
	.when('/edit/artiste/:id?', {
		templateUrl: 'views/editArtiste.html',
		controller : 'editArtisteCtrl'
	})
	.when('/edit/video/:id?', {
		templateUrl: 'views/editVideo.html',
		controller : 'editVideoCtrl'
	})
	.otherwise({
		resolve: {authFilter: 'authFilter'}
	});

}]);
