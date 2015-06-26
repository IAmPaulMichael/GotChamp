angular.module('gotChamp')
       .controller('DetailCtrl',['$scope','$routeParams','FileFactory','PublishFactory','DetailFactory',
       	function ($scope, $routeParams, FileFactory, PublishFactory, DetailFactory, authSetting) {
       	    $scope.id = $routeParams.accountId;

             var result = DetailFactory.getDetail({ id: $scope.id }, function (data) {

                 if (data.IsPublish) {
                     $scope.status = "UnPublish";
                 } else {
                     $scope.status = "Publish";
                 }
                
                $scope.detail = data;
                
                if (data.Path) {
                    $scope.hasImage = true;
                }
            },
            function(err){

            });
            
            $scope.upload = function(detail){
                  var image = {AccountId:detail.AdvertisementId, Title: detail.title}
                  FileFactory.uploadFile(image);
            };

            $scope.publish = function(detail){
                PublishFactory.publish(detail, function (data) {
  

                    $scope.status = function (id) {
                        return id == data.ImageId ? true : false;
                    }

                    if (data.IsPublish) {
                        $scope.status = "UnPublish";
                        toastr.success(data.Title + " is now Published !");
                       
                       
                    } else {
                        $scope.status = "Publish";
                        toastr.warning(data.Title + " is now UnPublished !");
                    }

                });
            }

       }])
       .factory('DetailFactory', ['$resource', 'authSetting', function ($resource, authSetting) {
           return	$resource(authSetting.serviceBaseUrl + '/api/advertisement/:id',{
             	id: '@id'
             },{
             	getDetail:{method:'GET'}
             });
       }])
       .factory('FileFactory', ['$resource', '$http', 'authSetting', function ($resource, $http, authSetting) {
           return $resource(authSetting.serviceBaseUrl + '/api/advertisement/upload',{},
       	     	{uploadFile:{method:'POST'}});
       }])
       .factory('PublishFactory', ['$resource', '$http', 'authSetting', function ($resource, $http, authSetting) {
           return $resource(authSetting.serviceBaseUrl+'/api/advertisement/publish',{},
       	     	{publish:{method:'POST'}});
       }]);