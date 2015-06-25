'use strict';

exports.tokLog = function(params, cb){
    if(params.token && params.login){
        cb(null, {token: params.token, login: params.login});
    }else{
        cb('Unvalid params.', null);
    }
};
