var quartiersCtrl = function(pics, getData, $scope, $routeParams, $http, $sce){

	getData.quartiers('').then(function(data){

		$scope.quartiers = data.data;
		
	}).then(function(){
		$scope.quartiers.forEach(function(i){
			pics.list_pics(i.path_pics).then(function(data){
				$scope.truc = data.data;
			}).then(function(){
				if ($scope.truc == "T") {
					i.imgs = ["img/badges/weekly.png"];
				}
				else{
					i.imgs = $scope.truc;
				}
			});
		});
	});
}