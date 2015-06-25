// (function(){
	'use strict';

	angular.module('myApp.services',[])

		.service('tools',['$http', '$sce', function($http, $sce){

			this.iframe = function(url){
				if (url.indexOf('youtube') != -1) {
					var token = url.split("watch?v=");
					token = token[1].split("&");
					token = token[0];
					var frame = "<iframe src='//www.youtube.com/embed/"+token+"?feature=player_detailpage' frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}
				else if (url.indexOf('vimeo') != -1) {
					var token = url.split("/");
					token = token[3];
					var frame = "<iframe src='//player.vimeo.com/video/"+ token+ "' frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}
				else{
					return "unsupported source. Contact webmaster.";
				}
				return $sce.trustAsHtml(frame);
			};

			this.soundcloud = function(url, idDOM){
				SC.initialize({
					client_id: "8a6b0e256518b81a23f4b8457c34ff6e",
				});
				SC.oEmbed(url, {auto_play: false}, document.getElementById(idDOM));

			};
		}])

		.service('pics', ['$http', function($http){

			this.list_pics = function(path){
				return $http.get('API/api.php?get=pics&path=' + path);
			};
		}]);
// })();
