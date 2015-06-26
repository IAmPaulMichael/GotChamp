'use strict';

angular.module('gotChamp')
    .factory('AccountsFactory',['$resource','$http','localStorageService', 'authSetting',
  	function($resource,$http,localStorageService, authSetting){
  	 
  	 var loginFactory = {}

     var _login = function(loginData){
        
      var data = "grant_type=password&username=" + loginData.username + "&password="+loginData.password;

	  return $http.post(authSetting.serviceBaseUrl + '/token',data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
	        .success(function (response) {
                localStorageService.set('authorizationData',{token:response.access_token, username: loginData.username, hasPlayed:response.isPlayed});
                return response;
	       });
     }
     
     loginFactory.login = _login;

     return loginFactory;
	  
  	}])
    .factory('RecoverFactory', ['$resource', '$http', 'authSetting', function ($resource, $http, authSetting) {

        var recoverFactory = {};

        var _recover = function (data) {
            return $http.post(authSetting.serviceBaseUrl + '/api/Message/Recover', data).then(function (response) {
                return response;
            });
        };

        var _changePassword = function (data) {
            return $http.post(authSetting.serviceBaseUrl + '/api/Account/ChangePassword', data).then(function (response) {
                return response;
            });
        };

        recoverFactory.recover = _recover;
        recoverFactory.changePassword = _changePassword;

        return recoverFactory;
    }])
  .controller('LoginCtrl', ['$scope', 'toastr', 'AccountsFactory','localStorageService','authService','$location','$cookieStore',
       function ($scope, toastr, AccountsFactory, localStorageService, authService, $location, $cookiesStore) {

           var authData = localStorageService.get('authorizationData');
 
           if (authData) {
               console.log(authData.token);
               $location.path('/');
            };
            $scope.user = $cookiesStore.get('username');
            $scope.pass = $cookiesStore.get('pass');
            if ( $scope.user  != "") {

                $scope.account = {
                    username :  $scope.user ,
                    password :  $scope.pass 

                };

                document.getElementById('remember').checked = true;
            }

            $scope.login = function(account){
                toastr.info('Logging in...');
                $('.panel-body').waitMe({
                    effect: 'rotation',
                    text: 'Logging in...',
                    bg: "rgba(255,255,255,0.7)",
                    color: "#000"
                });
                if (account.username != 'admin' && account.password != 'admin') {
                    AccountsFactory.login(account).then(function (success) {

                        $('.panel-body').waitMe('hide');


                        var remember = document.getElementById('remember');
                        if (remember.checked) {
                            $cookiesStore.put('username', account.username);
                            $cookiesStore.put('pass', account.password);
                        }

                        authService.fillAuthData();

                        $scope.authentication = authService.authentication;
                        $location.path("/");

                    }, function (error) {
                        $('.panel-body').waitMe('hide');
                        if (error.status == 500) {
                            toastr.error("Bad Server, please try again");
                        } else {
                            toastr.error(error.data.error_description);
                        }
                    });
                } else {
                    $location.path('/admin');
                }
                
                $scope.reset = function(){
                    $scope.account = {};
                };
            }
       }])
.controller('RecoverCtrl', ['$scope', '$rootScope', '$location', '$cookieStore', 'RecoverFactory', 'toastr', 'localStorageService', 
    function ($scope, $rootScope, $location, $cookieStore, RecoverFactory, toastr, localStorageService) {
    $scope.recover = function (account) {
        $('.panel-body').waitMe({
            effect: 'rotation',
            text: '',
            bg: "rgba(255,255,255,0.7)",
            color: "#000"
        });
        // insert recovery procedure here
        console.log(account);
        toastr.info("Sending your request.");

            $scope.sendRequest(account);
        // -------------------
    };

    $scope.sendRequest = function (account) {
        RecoverFactory.recover(account).then(function (data) {
            $('.panel-body ').waitMe('hide');
            localStorageService.set('recoverEmail', $scope.account.userEmail);
            
            localStorageService.set('confirmationCode', data.data);

            toastr.success("Verification code was sent to your email.");
            $location.path("/login/recover/reset");
        }, function (error) {
            $('.panel-body ').waitMe('hide');
            console.log(error);
            toastr.error(error.statusText);
        });
        // -------------------
    };

    $scope.checkCodes = function () {

        if (localStorageService.get('confirmationCode') == $scope.inputConfirmationCode) {
            return true;
        }
        return false;
    };

    $scope.changePassword = function (account) {
        $('.panel-body').waitMe({
            effect: 'rotation',
            text: '',
            bg: "rgba(255,255,255,0.7)",
            color: "#000"
        });
        $scope.account.Email = localStorageService.get('recoverEmail');
        $scope.account.confirmationCode = localStorageService.get('confirmationCode');

        if ($scope.account.confirmationCode != $scope.inputConfirmationCode) {
            toastr.error("Confrimation code did not match.");
            return;
        }

        if($scope.account.ConfirmPassword != $scope.account.Password) {
            toastr.error("Password did not match.");
            return;
        }

        toastr.info("Request sent. Awaiting confirmation.");

        RecoverFactory.changePassword(account).then(function (data) {
            $('.panel-body ').waitMe('hide');
            $cookieStore.remove("username");
            $cookieStore.remove("pass");
            localStorageService.remove("confirmationCode");
            localStorageService.remove("recoverEmail");

            $location.path("/login");
            toastr.success("Password Successfully changed.");
        }, function (error) {
            $('.panel-body ').waitMe('hide');
            console.log(error);
            toastr.error(error.statusText);
        });
    };
}])
;
