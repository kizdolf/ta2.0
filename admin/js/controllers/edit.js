'use strict';

var editController = function($scope, $http, localStorageService, $location, $rootScope, $routeParams, api, upload, postApi){
	var token = localStorageService.get('token');
	var login = localStorageService.get('login');
	var idSuppr;
	$scope.valid = false;

	/*Define what type of edit we need*/
	var promiseLs;
	var type;
	switch ($routeParams.type) {
		case 'quartier':
			type = 'quartier';
			promiseLs = postApi.lieux();
			break;
		case 'artiste':
			type = 'artiste';
			promiseLs = postApi.artistes();
			break;
		case 'video':
			type = 'video';
			promiseLs = postApi.videos();
			break;
		default:
			$location.path('/app');
	}


	promiseLs.then(function(lieux){
		$scope.lieux = lieux;
		if(!!$routeParams.id){
			idSuppr = $routeParams.id;
			$scope.showEdit = true;
			$scope.list = false;
			$scope.lieux.map(function(lieu){
				if(lieu._id == idSuppr){
					$scope.edit(lieu);
					return;
				}
			});
		}
		else{
			idSuppr = 0;
			$scope.message = "Edition de Lieu. Veuillez choisir un lieu à editer.";
			$scope.showEdit = false;
			$scope.list = true;
		}
	});

	$scope.suppr = function(id, name){
		$scope.message = "Validez la suppression";
		$scope.valid = true;
		$scope.list = false;
		$scope.showEdit = false;
		$scope.nameSuppr = name;
		idSuppr = id;
	};

	var promSuppr = function(pass){
		switch (type) {
			case 'quartier':
				return postApi.supprLieu(idSuppr, pass);
			case 'artiste':
				return postApi.supprArtiste(idSuppr, pass);
			case 'video':
				return postApi.supprVideo(idSuppr, pass);
		}
	};

	$scope.validSuppr = function(){
		var pass = sha256_digest($scope.password);
		$scope.password = "";
		promSuppr(pass).then(function(ret){
			if(ret.error){
				$scope.message = ret.error;
			}else{
				$scope.message = "Lieu " + $scope.nameSuppr + " bien supprimé.";
				$scope.valid = false;
				postApi.lieux().then(function(lieux){
					$scope.lieux = lieux;
					$scope.list = true;
				});
			}
		});
	};


	$scope.edit = function(lieu){
		$scope.message = "Edition de " + lieu.name + " en cours.";
		$scope.uriApi = '/api/pictures/lieux/' + lieu._id + '/' + token + '/' + login;
		angular.forEach(lieu.pics, function(pic){ //this is fucking dirty and disgusting! but working really well anyway...
			$('#lsPic').append('<li style="float: left"><img style="width: 120px; height: auto" src="' +
								pic + '"><button class="stupid" id="' + pic + '">Suppimer</button></li>');
		});
		$scope.showEdit = true;
		$scope.list = false;
		$scope.valid = false;
		$scope.lieuEdit = lieu;
		$scope.editor = CKEDITOR.replace('texteLieu', {removePlugins: 'sourcearea'});
		$scope.editor.setData(lieu.text);
	};

	$scope.onSuccess = function(res){
		$('#lsPic').prepend('<li style="float: left"><img style="width: 120px; height: auto" src="' + res.data.path + '"></li>');
	};

	$scope.validEdit = function(){
		var modif = {};
		modif.text = $scope.editor.getData();
		modif.name = $scope.lieuEdit.name;
		modif.id = $scope.lieuEdit._id;
		postApi.modif(modif).then(function(ret){
			$scope.message = ret;
			$scope.showEdit = false;
			$scope.list = true;
			$scope.valid = false;
		});
	};

	$scope.annulEdit = function(){
		$scope.showEdit = false;
		$scope.list = true;
		$scope.valid = false;
		$('#lsPic').html('');
	};

	//Ici un bout de Jquery pour palier à la requère GET effectué au chargement de la page.
	//au lieu d'un ng-repeat j'ai donc plus haut un angular.forEach suivi d'un bout de Jquery pour injecter de l'html.
	//oui c'est crade.
	$(document).on('click', '.stupid', function(){$scope.supprPic(this.id, $(this).parent());});
	$scope.supprPic = function(pic, li){
		postApi.supprPic($scope.lieuEdit._id, pic, 'lieux').then(function(ret){
			if(ret.message){
				$scope.message = ret.message;
				li.remove();
			}
		});
	};

};
