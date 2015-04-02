var headCtrl = function(pics, filterFilter, $scope, $http, $sce, getData, tools){

	$scope.title = "Welcome at Toulouse Acoustics";

	getData.weekly().then(function(data){
		$scope.weekly = data.data;
		$scope.weekly.video.frame = tools.iframe($scope.weekly.video.url);
		$scope.weekly.video.text = $sce.trustAsHtml($scope.weekly.video.text);
		$scope.weekly.artiste.text = $sce.trustAsHtml($scope.weekly.artiste.text);
		$scope.weekly.quartier.text = $sce.trustAsHtml($scope.weekly.quartier.text);
	}).then(function(){
		pics.list_pics($scope.weekly.artiste.path_pics).then(function(data){
			$scope.truc = data.data;
		});
	});

	$scope.change_video = function(choice){
		var id = parseInt($scope.weekly.video.id);
		getData.one_video(id, choice).then(function(data){
			$scope.weekly.video = data.data;
			$scope.weekly.video.frame = tools.iframe($scope.weekly.video.url);
			$scope.weekly.video.text = $sce.trustAsHtml($scope.weekly.video.text);
		});
	}

	$('body').click(function(){
		$('.sous_menu').hide();
	});

}