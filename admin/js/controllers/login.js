'use strict';

var adminTALogin = angular.module('adminTALogin',
	['adminTALogin.controllers', 'LocalStorageModule']);

adminTALogin.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('adminTA')
    .setStorageType('sessionStorage')
    .setNotify(true, true);
});


angular.module('adminTALogin.controllers', [])
.controller(
	'loginCtrl',
	['$scope', '$http', 'localStorageService', '$location', '$rootScope', '$window',
	function($scope, $http, localStorageService, $location, $rootScope, $window){

		/*If logued => redirect.*/
		var login = localStorageService.get('login');
		var date = localStorageService.get('date');
		var token = localStorageService.get('token');
		if(login === null || date === null || token === null)
			localStorageService.clearAll();
		else
			$window.location.href = '/admin/#/app';

		$scope.login = function(user){
			if(!!!user){
				$scope.message = "Please fill the fields.";
				return;
			}
			user.password = sha256_digest(user.mdp);
			user.mdp = "";
			$http.post('/api/login', user).then(function(data){
				var ret = data.data;
				if (!!ret.error)
					$scope.message = "login et/ou mot de passe incorrect(s).";
				else{
					var date = moment().unix();
					localStorageService.set('login', user.login);
					localStorageService.set('date', date);
					localStorageService.set('token', data.data.user.token);
					setTimeout(function(){
						$window.location.href = '/admin/';
					},500);
				}
			});
		};
	}
]);
