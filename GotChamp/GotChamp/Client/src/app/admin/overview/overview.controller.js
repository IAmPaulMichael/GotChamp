angular.module('gotChamp')
       .controller('AdminManagementCtrl', ['$scope','AdminManagementFactory', function ($scope,AdminManagementFactory) {
           AdminManagementFactory.getPublished(function (data) {
               console.log(data);
               $scope.listOfPublished = data;
           });
       }])
       .factory('AdminManagementFactory',['$resource', function ($resource) {
           return $resource('api/advertisement', {}, { getPublished: { method: 'GET' ,isArray:true} });
       }])