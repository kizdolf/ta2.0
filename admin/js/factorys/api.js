var api = function($http, localStorageService, $location){
return {
	"verif" : function(user){
		return $http.post('/api/login', user).then(function(data){
			var ret = data.data;
			if (!!ret.error)
				return false;
			else
				return data.data;
		});
	},

	"admins" : function(token, login){
		return $http.get('/api/admins/' + token + '/' + login).then(function(data){
			var ret = data.data;
			if(!!ret.error)
				return false;
			else
				return ret.admins;
		});
	},

	"supprAdmin" : function(token, login, admin){
		return $http.post('/api/admins/' + token + '/' + login, admin).then(function(data){
			return data.data;
		});
	},

	"editAdmin" : function(token, login, admin){
		return $http.put('/api/admins/' + token + '/' + login, admin).then(function(data){
			return data.data;
		});
	},

	"newAdmin" : function(token, login, admin){
		return $http.post('/api/newAdmin/' + token +  '/' + login, admin).then(function(data){
			if(data.data.error){
				return false;
			}else{
				return true;
			}
		});
	},

	"allowed" : function(token, login, required){
		return $http.get('/api/allowed/' + token + '/' + login + '/' + required).then(function(data){
			if (!data.data.allowed){
				localStorageService.set('message', 'Droits non suffisants');
				$location.path('/admin');
			}
		});
	},

	"whoAmI" : function(token, login){
		return $http.get('/api/me/' + token + '/' + login).then(function(data){
			return data.data.user;
		});
	}
}
};