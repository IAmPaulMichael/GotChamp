'use strict';

angular.module('gotChamp')
   .controller('AdsCtrl',['$scope','$location', 'authService', 'CountFactory','localStorageService', 'AdsFactory', 'CombinationFactory', function($scope,$location,authService, CountFactory, localStorageService, AdsFactory, CombinationFactory) {
           
      authService.fillAuthData();
      $scope.authentication = authService.authentication;
      $('.gallery').waitMe({
          effect: 'rotation',
          text: 'Retrieving Advertisments...',
          bg: "rgba(255,255,255,0.7)",
          color: "#9B1794"
      });
      AdsFactory.getGallery(function (data) {
          $('.gallery').waitMe('hide');
          $scope.galleries = data;
      }, function (err) {
          $('.gallery').waitMe('hide');
      });
      
      $scope.count = function(adId){
          
          var id = localStorageService.get('authorizationData');
          console.log(id.username);
          CountFactory.addClick({id:id.username,adId:adId});
      };
           var _combinationNumbers = localStorageService.get('combinationNumberData');
           var _username = localStorageService.get('authorizationData');
           
           $scope.notify = function() {
               var combinationInfo = {
                   UserName : _username.username,
                   Combination : _combinationNumbers.join("-")
               };
            
               toastr.info("Sending confirmation to your mail...");
               $('.for-ads').waitMe({
                   effect: 'rotation',
                   text: 'Sending confirmation to your mail...',
                   bg: "rgba(255,255,255,0.7)",
                   color: "#000"
               });

               CombinationFactory.sendCombination(combinationInfo).then(function(data) {
                   $('.for-ads').waitMe('hide');
                   toastr.success('Ticket successfully sent. An email notification was sent to your email address for the receipt');
                   $location.path("/goodluck");              
               }, function (error) {
                   $('.for-ads').waitMe('hide');
                   if (error.status==500) {
                       toastr.error("Something bad happened in server !, Please try again!.");
                   }
               });
           };
       }])
    .factory('AdsFactory', ['$resource', 'authSetting', function ($resource, authSetting) {
        return $resource(authSetting.serviceBaseUrl + '/api/advertisement/gallery', {},
             { getGallery: { method: 'GET', isArray: true } });
    }])
       .factory('CountFactory', ['$resource', 'authSetting', function ($resource, authSetting) {
           return $resource(authSetting.serviceBaseUrl + '/api/advertisement/click/:id', { id: '@id', adId: '@adId' },
       	     	{ addClick: { method: 'PUT' } });
       }])
       .factory('CombinationFactory', ['$http', 'authSetting', function ($http, authSetting) {
           var combinationFactory = {};

           var _sendCombination = function (data) {
               return $http.post(authSetting.serviceBaseUrl + '/api/message/combination', data).then(function (response) {
                   return response;
               });
           }

           combinationFactory.sendCombination = _sendCombination;

           return combinationFactory;
       }]);
