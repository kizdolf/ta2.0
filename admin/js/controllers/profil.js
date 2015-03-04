'use strict';

var profilController = function($scope, $http, localStorageService, $location, $rootScope, $routeParams, api){
	var token = localStorageService.get('token');
	var login = localStorageService.get('login');
	$scope.message = "Et voilà votre profil!";

	api.whoAmI(token, login).then(function(me){
		$scope.me = me;
		switch ($scope.me.statut){
			case 0 : 
				$scope.me.statut = "Full Admin";
			break;

			case 1 : 
				$scope.me.statut = "Admin Classique";
			break;

			case 2 : 
				$scope.me.statut = "Admin Basique";
			break;
		}
	});

};