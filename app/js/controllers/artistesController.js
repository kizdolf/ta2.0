var artistesCtrl = function(pics, getData, $scope, $routeParams, $http, $sce){

	getData.artistes_by('style').then(function(data){
		$scope.artistes = data.data;
	});
}