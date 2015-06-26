'use strict';

angular.module('gotChamp')
       .controller('MainCtrl', ['$scope', 'localStorageService', '$cookies', '$location', 'authService', '$interval', 'MainFactory', 'AccountStatusService', 'Test',
           function ($scope, localStorageService, $cookies, $location, authService, $interval, MainFactory, AccountStatusService,Test) {

           $scope.user = {};
           var n;
           var combiCount = 0;

           $scope.user = {};
           $scope.numbers = [];
           $scope.combinations = [];

           authService.fillAuthData();
           $scope.authentication = authService.authentication;

           $scope.displayedCombination = [];
           //var user = localStorageService.get('authorizationData');
           
           //console.log(user.hasPlayed);
           for (var i = 1; i <= 49; i++) {
               n = i > 9 ? "" + i : "0" + i;
               $scope.numbers.push(i);
           };


           $scope.checkPlayed = function () {
               var user = localStorageService.get('authorizationData');
               console.log(user.hasPlayed);
               if (user) {
                   $scope.hasPlayed = user.hasPlayed;
               }
           };

           $scope.UpdateCombination = function () {
               for (var x = 0; x < 7; x++) {
                   $scope.displayedCombination[x] = $scope.combinations[x];
               }
               //            console.log(combiCount);
           };

           $scope.loadCombination = function () {
               if (localStorageService.get("combinationNumberData") != null) {
                   for (var x = 0; x < 7; x++) {
                       $scope.combinations.push(localStorageService.get("combinationNumberData")[x]);
                   }
                   console.log($scope.combinations);

                   $scope.isSelected = function (value) {
                       return $scope.combinations.indexOf(value) >= 0 ? true : false;
                   };

                   combiCount = 7;
                   $scope.UpdateCombination();
               }
           };

           $scope.user.combinationNumber = "";
           $scope.play = function () {

               if($scope.hasPlayed) {
                   return;
               }

               if (combiCount == 0) {
                   toastr.warning("Please Select Number Selection");
                   return;
               }

               if (combiCount < 7) {
                   toastr.warning("Please Complete Your Number Selection");
                   return;
               }

               var authData = localStorageService.get('authorizationData');
               localStorageService.set('combinationNumberData', $scope.combinations);

               if (authData) {
                   if (combiCount == 7) {
                       $location.path("/ads");
                   };
               } else {
                   if (!$cookies.IsRegister) {
                       $location.path('register');
                   } else {
                       $location.path('/login');
                   };
               };
           };

           $scope.Select = function (number) {
               if ($scope.hasPlayed) {
                   return;
               }

               if (!($scope.combinations.indexOf(number) < 0)) {
                   $scope.Clear($scope.combinations.indexOf(number));
                   return;
               }
               if (combiCount < 7) {
                   var isTrue = false;
                   for (var x = 0; x < 7; x++) {
                       if ($scope.combinations[x] == null) {
                           $scope.combinations.splice(x, 1, number);
                           $scope.UpdateCombination();
                           isTrue = true;
                           break;
                       }
                   }

                   if (!isTrue) {
                       $scope.combinations.push(number);
                   }

                   combiCount++;
                   $scope.UpdateCombination();
               }

               $scope.isSelected = function (value) {
                   return $scope.combinations.indexOf(value) >= 0 ? true : false;
               };
           };

           $scope.Clear = function (number) {
               if ($scope.combinations[number] == null) {
                   return;
               }

               $scope.combinations.splice(number, 1, null);

               $scope.displayedCombination = [];
               combiCount--;
               $scope.UpdateCombination();
           };

           $scope.clearPicks = function () {
               $scope.combinations = [];
               $scope.displayedCombination = [];
               $scope.user.combinationNumber = "";
               combiCount = 0;
               $scope.UpdateCombination();

           };

           $scope.quickPicks = function () {

               $scope.combinations = [];

               for (var i = 0; i < 7; i++) {
                   var num = Math.floor((Math.random() * 49) + 1);
                   while ($scope.combinations.indexOf(num) >= 0) {
                       num = Math.floor((Math.random() * 49) + 1);
                   }

                   $scope.combinations.push(num);
               };

               $scope.isSelected = function (value) {
                   return $scope.combinations.indexOf(value) >= 0 ? true : false;
               };
               combiCount = 7;
               $scope.UpdateCombination();
           };

           $scope.Login = function (user) {

               MainFactory.login(user, function (data) {
                   console.log("success");
               }, function () {
                   console.log("error");
               });

           };

           $scope.remaining = {
               Hours: 0,
               Minutes: 0,
               Seconds: 0
           };
           $interval(function () {
               var time = new Date();
               refreshTime(time);
               //        alert(time);
           }, 1000);

           var refreshTime = function (time) {
               $scope.remaining = {
                   Hours: 24 - time.getHours(),
                   Minutes: 60 - time.getMinutes(),
                   Seconds: 60 - time.getSeconds()
               };
           };

           $scope.displayedNumbers = [];
           $scope.combinationRows = [];
           for (var x = 0; x < 7; x++) {
               $scope.displayedNumbers.push(x);
               $scope.combinationRows.push(x);
           }

           $scope.multiplier = function (multiplier) {
               return 7 * multiplier;
           }
       }])
    .factory('MainFactory', ['$resource', function ($resource) {
        return $resource('api/account', {}, {
            login: { method: 'POST' }
        })
    }])
    .factory('AccountStatusService', ['$http', function ($http) {
        var status = {};

        var _hasPlayed = function (data) {
            return $http.get('/api/Account/Status', data).then(function (response) {
                return response;
            });
        }

        status.hasPlayed = _hasPlayed;

        return status;
    }])
     .factory('Test', ['$http', function ($http) {
         var test = {}

         var reg = function (data) {
             return $http.post('api/account/register').then(function (data) {
                 console.log(data);
             });
         }

         test.Regs = reg;

         return test;
     }])
    .filter('slice', function () {

        return function (arr, start, end) {
            return arr.slice(start, end);
        }
    });
