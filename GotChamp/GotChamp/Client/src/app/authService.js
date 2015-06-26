angular.module('gotChamp')
       .factory('authService',['$location','localStorageService',function($location,localStorageService){
            var authServiceFactory = {}

             var _authentication = {
               isAuth : false
             };
            var _fillAuthData = function(){
            	var authData = localStorageService.get('authorizationData');
            	if (authData) {
            		  _authentication.isAuth = true;
            	}
            	else{
                      _authentication.isAuth = false;
            	};
               
            }

            authServiceFactory.fillAuthData = _fillAuthData;
            authServiceFactory.authentication  = _authentication;
            return authServiceFactory;
       }])