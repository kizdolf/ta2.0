'use strict';

angular.module('myApp.routes', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

	$routeProvider.when('/home', {
		templateUrl: 'views/home.html',
		controller: 'headCtrl'
	}).when('/artistes/:id', {
		templateUrl :'views/artiste.html',
		controller: 'artisteCtrl'
	}).when('/artistes', {
		templateUrl :'views/artistes.html',
		controller: 'artistesCtrl'
	}).when('/artistes_locaux', {
		templateUrl :'views/locaux.html',
		controller: 'locauxCtrl'
	}).when('/artistes_visiteurs', {
		templateUrl :'views/visiteurs.html',
		controller: 'visiteursCtrl'
	}).when('/quartiers', {
		templateUrl :'views/quartiers.html',
		controller: 'quartiersCtrl'
	}).when('/quartiers/:id', {
		templateUrl :'views/quartier.html',
		controller: 'quartierCtrl'
	}).when('/portfolio', {
		templateUrl :'views/pics.html',
		controller: 'picsCtrl'
	}).when('/about', {
		templateUrl :'views/about.html',
		controller: 'headCtrl'
	}).when('/partners', {
		templateUrl :'views/partners.html',
		controller: 'partnersCtrl'
	}).when('/contact', {
		templateUrl :'views/contact.html',
		controller: 'headCtrl'
	}).otherwise({
		redirectTo: '/home'
	});

	// // use the HTML5 History API
	// $locationProvider.html5Mode(true);

}]);
