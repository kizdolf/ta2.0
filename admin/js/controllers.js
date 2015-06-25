'use strict';

angular.module('adminTA.controllers', [])

.controller(
	'logedCtrl',
	['$scope', '$http', 'localStorageService', '$location',
function($scope, $http, localStorageService, $location){

	var delay = moment().unix() - localStorageService.get('date');
	if (delay > 3600)
		$location.path('/login');
	if (localStorageService.get('token') === null || localStorageService.get('date') === null || localStorageService.get('login') === null) {
		$location.path('/login');
	}

	$scope.nameLoged = localStorageService.get('login');

	$scope.logout = function(){
		localStorageService.clearAll();
		$location.path('/login');
	};

}])

.controller(
	'gestionCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope', '$routeParams', 'api',
	gestionController
])

.controller(
	'appCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope', 'postApi', '$sce', '$window',
	appController
])

.controller(
	'profilCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope', '$routeParams', 'api',
	profilController
])

.controller(
	'quartierCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope', '$routeParams', 'api', 'upload', 'postApi',
	quartierController
])

.controller(
	'postCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope', '$routeParams', 'api', 'upload', 'postApi', '$timeout',
	postController
])

.controller(
	'editCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope', '$routeParams', 'api', 'upload', 'postApi',
	editController
]);
