var appController = function($scope, $http, localStorageService, $location, $rootScope, postApi, $sce){

	$scope.playVideo = false;

	if(localStorageService.get('message') !== null){
		$scope.message = localStorageService.get('message');
		localStorageService.remove('message');
	}

	$scope.logout = function(){
		localStorageService.clearAll();
		$location.path('/login');
	}

	postApi.lsPosts().then(function(data){
		$scope.posts = data.posts;
	});

	$scope.play = function(link){
		var html = getToken(link);
		$scope.playVideo = true;
		$scope.frame = $sce.trustAsHtml(html);
		
	}

	var getToken = function(link){
		if(link.indexOf('vimeo') != -1)
			return  ("<iframe src='//player.vimeo.com/video/"+ link.split("/")[3] + "' frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
		else
			return ("<iframe src='//www.youtube.com/embed/" + link.split("watch?v=")[1].split('&')[0] + "?feature=player_detailpage' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
	}
}