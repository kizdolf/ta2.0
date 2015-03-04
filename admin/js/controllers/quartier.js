'use strict';

var quartierController = function($scope, $http, localStorageService, $location, $rootScope, $routeParams, api, upload, postApi){
	var token = localStorageService.get('token');
	var login = localStorageService.get('login');

	$scope.addPic = false;

	$scope.message = "Nouveau quartier!"

	var editor = CKEDITOR.replace('texteLieu', {removePlugins: 'sourcearea'});

	$scope.newQuartier = function(lieu){
		lieu.text = editor.getData();
		postApi.newQuartier(lieu).then(function (id) {
			if(!!id){
				$scope.addPic = true;
				$scope.uriApi = '/api/pictures/lieux/' + id + '/' + token + '/' + login;
				$scope.message = "Quartier " + lieu.name + " crée, vous pouvez ajouter des photos";
			}
		});
	}

	$scope.onSuccess = function(res){
		console.log('ret' + res.data.path);
		$('#listImg').append('<li><img src="' + res.data.path + '"></li>');
	}

};