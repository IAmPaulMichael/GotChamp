angular.module('gotChamp')
       .controller('GoodluckCtrl',['$scope','$location','localStorageService','authService',
       	function ($scope, $location,localStorageService, authService) {
            
            var _combinationNumbers = localStorageService.get('combinationNumberData');
            
            $scope.combinationNumbers = _combinationNumbers;

            $scope.done = function () {
                var user = localStorageService.get('authorizationData');
                user.hasPlayed = 'True';
                localStorageService.set('authorizationData', user);

                localStorageService.remove('combinationNumberData');
                $location.path("/");
            }
            
		      authService.fillAuthData();
		      $scope.authentication = authService.authentication;
       }]);