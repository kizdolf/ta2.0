'use strict';

var gestionController = function($scope, $http, localStorageService, $location, $rootScope, $routeParams, api){
	var token = localStorageService.get('token');
	var login = localStorageService.get('login');
	$scope.editAdm = false;
	$scope.validEdit = false;

	api.allowed(token, login, 0);
	
	api.admins(token, login).then(function(ls){
		$scope.admins = ls;
		console.log(ls);
	});

	$scope.supprAdmin = function(admin){
		api.supprAdmin(token, login, admin).then(function(ret){
			if(ret == 1){
				api.admins(token, login).then(function(ls){
					$scope.admins = ls;
					$scope.message = "Admin " + admin.name + " bien supprimé";
				});
			}
		});
	}

	$scope.showEditAdmin = function(admin){
		$scope.editAdm = true;
		$scope.toEdit = admin;
	}

	$scope.editAdmin = function(model){
		if (model.mdp == model.mdpverif){
			$scope.validEdit = true;
			console.log(model.mdp);
			if(model.mdp != undefined)
				$scope.toEdit.newPass = sha256_digest(model.mdp);
		}
		else
			$scope.message = "les mot de passe ne correspondent pas.";
	}

	$scope.valid = function(mdpVerif){
		$scope.toEdit.mdp = "";
		$scope.toEdit.mdpverif = "";
		$scope.toEdit.passVerif = sha256_digest(mdpVerif);
		api.editAdmin(token, login, $scope.toEdit).then(function(ret){
			if(ret.error)
				$scope.message = ret.error;
			else
				$scope.message = ret.message;
		});
	}

	$scope.newAdmin = function(newAdm){
		newAdm.password = sha256_digest(newAdm.pass);
		delete(newAdm.pass);
		delete(newAdm.passVerif);
		api.newAdmin(token, login, newAdm).then(function(created){
			if(created){
				$scope.message = "Admin " + newAdm.name + " créer!";
				api.admins(token, login).then(function(ls){
					$scope.admins = ls;
				});
			}
		});
	};
};