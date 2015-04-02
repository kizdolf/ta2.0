var picsCtrl = function(pics, getData, $scope, $routeParams, $http, $sce){

	$('#pics_viewer').hide();

	getData.artistes('').then(function(data){
		$scope.artistes = data.data;
	});

	getData.quartiers('').then(function(data){
		$scope.quartiers = data.data;
	});

	$scope.name_click = function(path){
		$scope.index = 0;
		pics.list_pics(path).then(function(data){
			$scope.pics = data.data;
			$scope.pic = data.data[$scope.index];
		}).then(function(){
			$('#pics_viewer').show();
		});
	};

	$scope.next_pic = function(){
		$scope.index = $scope.index + 1;
		if(!angular.isDefined($scope.pics[$scope.index]))
				$scope.index = 0;
		$scope.pic = $scope.pics[$scope.index];
	}

	$scope.prev_pic = function(){
		$scope.index = $scope.index - 1;
		if($scope.index < 0)
			$scope.index = $scope.pics.length - 1;
		$scope.pic = $scope.pics[$scope.index];
	}

	$('.pic_close').click(function(){
		$('#pics_viewer').hide();
		$scope.index = 0;
	});

	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('#pics_viewer').hide();
		}
	});
}