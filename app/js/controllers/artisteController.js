var artisteCtrl  = function(tools, getData, $scope, $routeParams, $http, $sce){

	getData.related('artiste', 'name', $routeParams.id).then(function(data){
		$scope.artiste = data.data;
		tools.soundcloud(data.data.artiste.itw, "lol");
	});
}