var aboutCtrl = function(getData, $scope, $sce){
	getData.about().then(function(data){
		$scope.text = $sce.trustAsHtml(data.data.text);
	});
}