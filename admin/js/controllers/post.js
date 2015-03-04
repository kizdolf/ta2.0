'use strict';

var postController = function($scope, $http, localStorageService, $location, $rootScope, $routeParams, api, upload, postApi, $timeout){
	var token = localStorageService.get('token');
	var login = localStorageService.get('login');

	$scope.post = {};
	$scope.post.lieu = {};
	$scope.post.video = {};
	$scope.post.pics = {};
	$scope.post.pics.nb = 0;

	$scope.step = "lieu";

	$scope.message = "nouveau post!";
	
	postApi.lieux().then(function(lieux){
		$scope.choiceLieu = lieux;
	});

	$scope.step2 = function(id, name){
		$scope.message = "";
		$scope.post.lieu.id = id;
		$scope.post.lieu.name = name;
		$scope.step = "artiste";
		$timeout(function(){
			$scope.editor = CKEDITOR.replace('textArtiste', {removePlugins: 'sourcearea'});
		}, 500);
	};

	$scope.step3 = function(artiste){
		$scope.post.artiste = artiste;
		$scope.post.artiste.text = $scope.editor.getData();
		postApi.newArtiste($scope.post.artiste).then(function(id){
			$scope.uriApi = '/api/pictures/artistes/' + id + '/' + token + '/' + login;
			$scope.step = "artistePic";
			$scope.post.artiste.id = id;
		});
	};

	$scope.step4 = function(){
		$scope.step = "video";
		$timeout(function(){
			$scope.editor = CKEDITOR.replace('textVideo', {removePlugins: 'sourcearea'});
		}, 500);
	};

	$scope.step5 = function(video){
		$scope.post.video = video;
		$scope.post.video.text = $scope.editor.getData();
		postApi.newPost($scope.post).then(function(post){
			$scope.post = post;
			$scope.step = "final";
		});	
	}

	$scope.artistePicAdded = function(res){
		if(!!res.data.path){
			$('#listImgArtiste').append('<li class="li-pic"><img  class="small-pic" src="' + res.data.path + '"></li>');
			$scope.post.pics.nb = $scope.post.pics.nb + 1;
		}
	};
};