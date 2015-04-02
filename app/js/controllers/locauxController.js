var locauxCtrl = function(pics, getData, $scope, $routeParams, $http, $sce){

	getData.art_cat(0).then(function(data){
		$scope.artistes = data.data;
	});
}