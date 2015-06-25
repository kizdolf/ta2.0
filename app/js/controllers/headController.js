var headCtrl = function(pics, filterFilter, $scope, $http, $sce, tools, Posts){
	var index = 0;

	Posts.get_weekly(function(post){
		$scope.weekly = post;
	});

};
