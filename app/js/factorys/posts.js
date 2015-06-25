var Posts = function($http, $q, $sce, tools){

    var _posts = null;
    return {
        'get' : function(){
            var def = $http.get('/api/posts');
            def.then(function(data){
                _posts = data.data.posts;
            });
            return def;
        },
        get_weekly: function(cb){
            var weekly;
            if(!_posts)
                this.get().then(function(){
                    weekly = _posts[0];
                    weekly.video.text = $sce.trustAsHtml(weekly.video.text);
                    weekly.artiste.text = $sce.trustAsHtml(weekly.artiste.text);
                    weekly.lieu.text = $sce.trustAsHtml(weekly.lieu.text);
                    weekly.frame = tools.iframe(weekly.video.link);
                    cb(weekly);
                });
            else
                weekly = _posts[0];
                cb(weekly);
        }
    };
};
