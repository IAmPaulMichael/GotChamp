'use strict';

angular.module('gotChamp')
  .controller('NavbarCtrl', ['$scope', '$rootScope', '$injector','$location','localStorageService', '$http','authService', function ($scope, $rootScope, $injector,$location,localStorageService, $http,authService) {
    $scope.date = new Date();


    
      $scope.signOut = function(){
      localStorageService.remove('authorizationData');
      localStorageService.remove('combinationNumberData');

      $location.path('/login');

      }
      $scope.getLocation = function() {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
              console.log("Geolocation is not supported by this browser.");
          }
      };
      
      function showPosition(position) {
          var latlong = position.coords.latitude + ', ' + position.coords.longitude;
          var apiKey = "AIzaSyB_myO051KClGxXvMku_d5JA3r_0VUfgzo";
          $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlong +  '&location_type=ROOFTOP&result_type=street_address&key=' + apiKey + '')
          .success(function(data) {
//            console.log(data.results);
            var components = data.results[0].address_components;
            $rootScope.currentLocation = {
                byGeo : {
                    name : components[components.length - 1].long_name,
                    code : components[components.length - 1].short_name,
                    region : components[components.length - 2].long_name,
                    city : components[components.length - 3].long_name
                }, 
                biIP : {
                    name : geoplugin_countryName(),
                    code : geoplugin_countryCode(),
                    region : geoplugin_region(),
                    city : geoplugin_city()
                }
          };
          }).error(function(error) {
            console.log(error);
          });
      }
      
//      alert("Your location is: " + geoplugin_countryName() + ", " + geoplugin_region() + ", " + geoplugin_city());
  }]);
