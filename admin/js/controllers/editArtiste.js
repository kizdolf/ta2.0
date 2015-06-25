'use strict';

var editArtisteController = function($scope, $http, localStorageService, $location, $rootScope, $routeParams, api, upload, postApi){
	var token = localStorageService.get('token');
	var login = localStorageService.get('login');
	postApi.artistes()
	.then(function(artistes){
		$scope.artistes = artistes;
		if($routeParams.id){
			$scope.artistes.map(function(artiste){
				if(artiste._id === $routeParams.id){
					$scope.edit(artiste);
					return;
				}
			});
		}
	});

	$scope.edit = function(artiste){
		console.log(artiste);
		$scope.message = "Edition de " + artiste.name + " en cours.";
		$scope.uriApi = '/api/pictures/artistes/' + artiste._id + '/' + token + '/' + login;
		angular.forEach(artiste.pics, function(pic){ //this is fucking dirty and disgusting! but working really well anyway...
			$('#lsPic').append('<li style="float: left"><img style="width: 120px; height: auto" src="' +
								pic + '"><button class="stupid" id="' + pic + '">Suppimer</button></li>');
		});
		$scope.showEdit = true;
		$scope.list = false;
		$scope.valid = false;
		$scope.artisteEdit = artiste;
		$scope.editor = CKEDITOR.replace('texteLieu', {removePlugins: 'sourcearea'});
		$scope.editor.setData(artiste.text);
	};

	$(document).on('click', '.stupid', function(){$scope.supprPic(this.id, $(this).parent());});
	$scope.supprPic = function(pic, li){
		postApi.supprPic($scope.artisteEdit._id, pic, 'artistes').then(function(ret){
			if(ret.message){
				$scope.message = ret.message;
				li.remove();
			}
		});
	};
};
