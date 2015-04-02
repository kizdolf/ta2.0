var visiteursCtrl = function(pics, getData, $scope, $routeParams, $http, $sce){

	getData.art_cat(1).then(function(data){
		$scope.artistes = data.data;
	});
}