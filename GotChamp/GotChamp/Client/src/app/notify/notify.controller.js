'use strict';

angular.module('gotChamp')
    
    .controller( ['$scope', '$location', function($scope, $location) {
        $scope.resend = function() {
            $location.path("login/recover");
        };
    }])
;
