'use strict';

angular.module('adminTA.controllers', [])

.controller(
	'logedCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope',
function($scope, $http, localStorageService, $location, $rootScope){

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
	}

}])

.controller(
	'loginCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope', 'api',
	loginController
])

.controller(
	'gestionCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope', '$routeParams', 'api',
	gestionController
])

.controller(
	'appCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope', 'postApi', '$sce',
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
	'editQuartierCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope', '$routeParams', 'api', 'upload', 'postApi',
	editQuartierController
]);