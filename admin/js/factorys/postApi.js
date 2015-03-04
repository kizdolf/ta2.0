var postApi = function($http, localStorageService, $location){
	var token = localStorageService.get('token');
	var login = localStorageService.get('login');
	return {
		"newQuartier" : function(lieu){
			return $http.post('/api/quartier/' + token + '/' + login, lieu).then(function(data){
				if(data.data.message)
					return data.data.id;
				else
					return false;
			});
		},

		"newArtiste" : function(artiste){
			return $http.post('/api/artiste/' + token + '/' + login, artiste).then(function(data){
				if(data.data.message)
					return data.data.id;
				else
					return false;
			});
		},

		"newPost" : function(post){
			return $http.post('/api/post/' + token + '/' + login, post).then(function(data){
				if(data.data.message)
					return data.data;
				else
					return false;
			});
		},

		"lieux" : function(){
			return $http.get('/api/quartier/' + token + '/' + login).then(function(ret){
				if(!ret.data.error)
					return(ret.data.lieux);
				else
					return ret.data.error;
			});
		},

		"supprLieu" : function(id, pass){
			var obj = {id: id, pass: pass};
			return $http.patch('/api/quartier/' + token + '/' + login, obj).then(function(data){
				return(data.data);
			});
		},

		"modif" : function(obj){
			return $http.put('/api/quartier/' + token + '/' + login, obj).then(function(data){
				console.log(data.data);
				if(data.data.error)
					return (data.data.error);
				else
					return (data.data.message);
			});
		},

		"supprPic" : function(id, pic, type){
			return $http.patch('/api/pictures/' + type + '/' + id + '/' + token + '/' + login, {numPic: pic}).then(function(data){
				return data.data;
			});
		},

		"lsPosts" : function(){
			return $http.get('/api/posts').then(function(data){
				return data.data;
			});
		}
	}
};