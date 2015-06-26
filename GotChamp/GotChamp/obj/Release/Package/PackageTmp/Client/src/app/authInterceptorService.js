angular.module('gotChamp')
   .factory('authInterceptorService',['$location','localStorageService',function($location,localStorageService){
         var authInterceptorServiceFactory = {}

         var _request = function(config){
             config.headers  = config.headers || {};

             var authData = localStorageService.get('authorizationData');

             if (authData) {
             	config.headers.Authorization = 'Bearer ' + authData.token;
             };

             return config;
         }

         authInterceptorServiceFactory._request = _request;

         return authInterceptorServiceFactory;
   }]);