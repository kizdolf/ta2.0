'use strict';

var loginController = function($scope, $http, localStorageService, $location, $rootScope, api){
		
		$('#mainFrame').hide(0);

	$scope.login = function(user){
		localStorageService.clearAll();
		if(!!!user){
			$scope.message = "Please fill the fields.";
			return;
		}
		user.password = sha256_digest(user.mdp);
		user.mdp = "";
		api.verif(user).then(function(isAdmin){
			if(isAdmin !== false){
				var date = moment().unix();
				localStorageService.set('login', user.login);
				localStorageService.set('date', date);
				localStorageService.set('token', isAdmin.user.token);
				$('#mainFrame').show(0);
				$location.path('/app');
			}else{
				$scope.message = "login et/ou mot de passe incorrect(s).";
			}
		});
	};

}