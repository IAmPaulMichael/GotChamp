angular.module('gotChamp')
       .controller('ManagementCtrl',['$scope','$routeParams','$location','toastr','ManagementFactory','AdvertisementFactory',
       	 function ($scope, $routeParams, $location, toastr, ManagementFactory, AdvertisementFactory) {
             $scope.advertisements = []
             var status = $routeParams.status;

             RetrieveAdvertisementList(status);

              $scope.save = function (advertisement) {
                  $('.panel-body').waitMe({
                      effect: 'rotation',
                      text: '',
                      bg: "rgba(255,255,255,0.7)",
                      color: "#000"
                  });

                   ManagementFactory.register(advertisement, function (data) {

                     
                     	RetrieveAdvertisementList(data.Status);
                   
                     	$('.panel-body ').waitMe('hide');

                     	toastr.success('Advertisement Successfully Save !');
                  }, function (err) {
                      $('.panel-body ').waitMe('hide');
                     	toastr.error('Cannot Save Advertisement');
                     });
               };

               function RetrieveAdvertisementList(status) {
                   
                   AdvertisementFactory.getList({ status: status }, function (data) {

                       $scope.advertisements = data;
                    },
                    function(err){
                        //Error
                    });
               }
       }])
       .factory('ManagementFactory', ['$resource', 'authSetting', function ($resource, authSetting) {
       	     

           return $resource(authSetting.serviceBaseUrl + '/api/advertisement/:status', {status:'@status'}, { register: { method: 'POST' } });

       }])
       .factory('AdvertisementFactory', ['$resource', 'authSetting',function ($resource, authSetting) {
           return $resource(authSetting.serviceBaseUrl + '/api/advertisement',{},{getList:{method:'GET',isArray:true}});
       }]);