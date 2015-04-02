var partnersCtrl = function($http, getData, $scope, $sce){

	console.log("coucou");
	getData.partners().then(function(data){
		$scope.partners = data.data;
	}).then(function(){
		$scope.partners.forEach(function(one){
			one.desc= $sce.trustAsHtml(one.desc);
		});
		console.log($scope.partners);
	});

}