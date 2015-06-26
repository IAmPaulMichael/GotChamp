'use strict';

angular.module('gotChamp', ['ngAnimate', 'ngCookies', 'LocalStorageModule', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
            templateUrl: 'Client/src/app/main/main.html',
            controller: 'MainCtrl'
        })
        .when('/game', {
            templateUrl: 'Client/src/app/game/game.html',
            controller: 'GameCtrl'
        })
        .when('/login', {
            templateUrl: 'Client/src/app/login/login.html',
            controller: 'LoginCtrl'
        })
      .when('/register', {
          templateUrl: 'Client/src/app/registration/register.html',
          controller: 'RegisterCtrl'
      })
      .when('/register/confirmation/:userId/token?:code', {
          templateUrl: 'Client/src/app/registration/confirmation.html',
          controller: 'RegisterCtrl'
      })
      .when('/ads', {
          templateUrl: 'Client/src/app/ads/ads.html',
          controller: 'AdsCtrl'
      })
      .when('/draw/:id', {
          templateUrl: 'Client/src/app/gameDraw/newDraw.html',
          controller: 'GameDrawCtrl'
      })
       .when('/draw', {
           templateUrl: 'Client/src/app/gameDraw/newDraw.html',
           controller: 'GameDrawCtrl'
       })
       .when('/goodluck', {
           templateUrl: 'Client/src/app/goodluck/goodluck.html',
           controller: 'GoodluckCtrl'
       })
      .when('/login/recover', {
          templateUrl: 'Client/src/app/login/recover.html',
          controller: 'RecoverCtrl'
      })
      .when('/login/recover/reset', {
          templateUrl: 'Client/src/app/notify/recover-change-password.html',
          controller: 'RecoverCtrl'
      })
      .when('/admin', {
          templateUrl: 'Client/src/app/admin/admin.html',
          controller: ''
      })
      .when('/admin/upload', {
          templateUrl: 'Client/src/app/admin/upload/admin.html',
          controller: ''
      })
      .when('/admin/manage', {
          templateUrl: 'Client/src/app/admin/manage/manage.html',
          controller: 'ManagementCtrl'
      })
    .when('/login/recover', {
        templateUrl: 'Client/src/app/login/recover.html',
        controller : 'RecoverCtrl'
    })
    .when('/login/recover/reset', {
        templateUrl: 'Client/src/app/notify/recover-change-password.html',
        controller : 'RecoverCtrl'
    })
    .when('/admin/manage/sponsors/:status', {
        templateUrl: 'Client/src/app/admin/manage/manage.html',
        controller: 'ManagementCtrl'
    })
    .when('/admin/manage/overview', {
        templateUrl: 'Client/src/app/admin/overview/overview.html',
        controller: 'AdminManagementCtrl'
    })
    .when('/admin', {
        templateUrl: 'Client/src/app/admin/admin.html',
        controller : ''
    })
      .when('/ads/detail/:accountId', {
          templateUrl: 'Client/src/app/admin/ads/detail/detail.html',
          controller: 'DetailCtrl'
      })
          .when('/terms-and-conditions', {
              templateUrl: 'Client/src/app/TAC/tac.html',
              controller: 'TacCtrl'
          })
      .otherwise({
          redirectTo: '/'
      });

      $locationProvider.html5Mode(true);

  })
     .run(['authService', function (authService) {
         authService.fillAuthData();
     }])
     .config(function ($httpProvider) {
         $httpProvider.interceptors.push('authInterceptorService');
     })
    .value('toastr', toastr)
    .constant('authSetting', {
        serviceBaseUrl: "http://localhost:64340"
        //serviceBaseUrl: "http://gotchamp.azurewebsites.net"
    });