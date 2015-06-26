'use strict';

angular.module('gotChamp')
  .factory('RegisterFactory',['$http','authSetting',function($http,authSetting){
  	  
      var registerFactory = {};

      var _register = function(account){
            
          // return $http.post(authSetting.serviceBaseUrl, + '/api/account/registsfssder', data).then(function (response) {
               
          //  return response;

          return $http.post('/api/account/register',account).then(function (data) {
              console.log(data);
          });
   

        }
       
       registerFactory.registers = _register;

       return registerFactory;
	  
   }])
    .factory('LocationsFactory', ['$resource', function($resource){
    var countries = [ 
        {name: 'Afghanistan', code: 'AF'},
        {name: 'Åland Islands', code: 'AX'},
        {name: 'Albania', code: 'AL'},
        {name: 'Algeria', code: 'DZ'},
        {name: 'American Samoa', code: 'AS'},
        {name: 'Andorra', code: 'AD'},
        {name: 'Angola', code: 'AO'},
        {name: 'Anguilla', code: 'AI'},
        {name: 'Antarctica', code: 'AQ'},
        {name: 'Antigua and Barbuda', code: 'AG'},
        {name: 'Argentina', code: 'AR'},
        {name: 'Armenia', code: 'AM'},
        {name: 'Aruba', code: 'AW'},
        {name: 'Australia', code: 'AU'},
        {name: 'Austria', code: 'AT'},
        {name: 'Azerbaijan', code: 'AZ'},
        {name: 'Bahamas', code: 'BS'},
        {name: 'Bahrain', code: 'BH'},
        {name: 'Bangladesh', code: 'BD'},
        {name: 'Barbados', code: 'BB'},
        {name: 'Belarus', code: 'BY'},
        {name: 'Belgium', code: 'BE'},
        {name: 'Belize', code: 'BZ'},
        {name: 'Benin', code: 'BJ'},
        {name: 'Bermuda', code: 'BM'},
        {name: 'Bhutan', code: 'BT'},
        {name: 'Bolivia', code: 'BO'},
        {name: 'Bosnia and Herzegovina', code: 'BA'},
        {name: 'Botswana', code: 'BW'},
        {name: 'Bouvet Island', code: 'BV'},
        {name: 'Brazil', code: 'BR'},
        {name: 'British Indian Ocean Territory', code: 'IO'},
        {name: 'Brunei Darussalam', code: 'BN'},
        {name: 'Bulgaria', code: 'BG'},
        {name: 'Burkina Faso', code: 'BF'},
        {name: 'Burundi', code: 'BI'},
        {name: 'Cambodia', code: 'KH'},
        {name: 'Cameroon', code: 'CM'},
        {name: 'Canada', code: 'CA'},
        {name: 'Cape Verde', code: 'CV'},
        {name: 'Cayman Islands', code: 'KY'},
        {name: 'Central African Republic', code: 'CF'},
        {name: 'Chad', code: 'TD'},
        {name: 'Chile', code: 'CL'},
        {name: 'China', code: 'CN'},
        {name: 'Christmas Island', code: 'CX'},
        {name: 'Cocos (Keeling) Islands', code: 'CC'},
        {name: 'Colombia', code: 'CO'},
        {name: 'Comoros', code: 'KM'},
        {name: 'Congo', code: 'CG'},
        {name: 'Congo, The Democratic Republic of the', code: 'CD'},
        {name: 'Cook Islands', code: 'CK'},
        {name: 'Costa Rica', code: 'CR'},
        {name: 'Cote D\'Ivoire', code: 'CI'},
        {name: 'Croatia', code: 'HR'},
        {name: 'Cuba', code: 'CU'},
        {name: 'Cyprus', code: 'CY'},
        {name: 'Czech Republic', code: 'CZ'},
        {name: 'Denmark', code: 'DK'},
        {name: 'Djibouti', code: 'DJ'},
        {name: 'Dominica', code: 'DM'},
        {name: 'Dominican Republic', code: 'DO'},
        {name: 'Ecuador', code: 'EC'},
        {name: 'Egypt', code: 'EG'},
        {name: 'El Salvador', code: 'SV'},
        {name: 'Equatorial Guinea', code: 'GQ'},
        {name: 'Eritrea', code: 'ER'},
        {name: 'Estonia', code: 'EE'},
        {name: 'Ethiopia', code: 'ET'},
        {name: 'Falkland Islands (Malvinas)', code: 'FK'},
        {name: 'Faroe Islands', code: 'FO'},
        {name: 'Fiji', code: 'FJ'},
        {name: 'Finland', code: 'FI'},
        {name: 'France', code: 'FR'},
        {name: 'French Guiana', code: 'GF'},
        {name: 'French Polynesia', code: 'PF'},
        {name: 'French Southern Territories', code: 'TF'},
        {name: 'Gabon', code: 'GA'},
        {name: 'Gambia', code: 'GM'},
        {name: 'Georgia', code: 'GE'},
        {name: 'Germany', code: 'DE'},
        {name: 'Ghana', code: 'GH'},
        {name: 'Gibraltar', code: 'GI'},
        {name: 'Greece', code: 'GR'},
        {name: 'Greenland', code: 'GL'},
        {name: 'Grenada', code: 'GD'},
        {name: 'Guadeloupe', code: 'GP'},
        {name: 'Guam', code: 'GU'},
        {name: 'Guatemala', code: 'GT'},
        {name: 'Guernsey', code: 'GG'},
        {name: 'Guinea', code: 'GN'},
        {name: 'Guinea-Bissau', code: 'GW'},
        {name: 'Guyana', code: 'GY'},
        {name: 'Haiti', code: 'HT'},
        {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
        {name: 'Holy See (Vatican City State)', code: 'VA'},
        {name: 'Honduras', code: 'HN'},
        {name: 'Hong Kong', code: 'HK'},
        {name: 'Hungary', code: 'HU'},
        {name: 'Iceland', code: 'IS'},
        {name: 'India', code: 'IN'},
        {name: 'Indonesia', code: 'ID'},
        {name: 'Iran, Islamic Republic Of', code: 'IR'},
        {name: 'Iraq', code: 'IQ'},
        {name: 'Ireland', code: 'IE'},
        {name: 'Isle of Man', code: 'IM'},
        {name: 'Israel', code: 'IL'},
        {name: 'Italy', code: 'IT'},
        {name: 'Jamaica', code: 'JM'},
        {name: 'Japan', code: 'JP'},
        {name: 'Jersey', code: 'JE'},
        {name: 'Jordan', code: 'JO'},
        {name: 'Kazakhstan', code: 'KZ'},
        {name: 'Kenya', code: 'KE'},
        {name: 'Kiribati', code: 'KI'},
        {name: 'Korea, Democratic People\'s Republic of', code: 'KP'},
        {name: 'Korea, Republic of', code: 'KR'},
        {name: 'Kuwait', code: 'KW'},
        {name: 'Kyrgyzstan', code: 'KG'},
        {name: 'Lao People\'s Democratic Republic', code: 'LA'},
        {name: 'Latvia', code: 'LV'},
        {name: 'Lebanon', code: 'LB'},
        {name: 'Lesotho', code: 'LS'},
        {name: 'Liberia', code: 'LR'},
        {name: 'Libyan Arab Jamahiriya', code: 'LY'},
        {name: 'Liechtenstein', code: 'LI'},
        {name: 'Lithuania', code: 'LT'},
        {name: 'Luxembourg', code: 'LU'},
        {name: 'Macao', code: 'MO'},
        {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
        {name: 'Madagascar', code: 'MG'},
        {name: 'Malawi', code: 'MW'},
        {name: 'Malaysia', code: 'MY'},
        {name: 'Maldives', code: 'MV'},
        {name: 'Mali', code: 'ML'},
        {name: 'Malta', code: 'MT'},
        {name: 'Marshall Islands', code: 'MH'},
        {name: 'Martinique', code: 'MQ'},
        {name: 'Mauritania', code: 'MR'},
        {name: 'Mauritius', code: 'MU'},
        {name: 'Mayotte', code: 'YT'},
        {name: 'Mexico', code: 'MX'},
        {name: 'Micronesia, Federated States of', code: 'FM'},
        {name: 'Moldova, Republic of', code: 'MD'},
        {name: 'Monaco', code: 'MC'},
        {name: 'Mongolia', code: 'MN'},
        {name: 'Montserrat', code: 'MS'},
        {name: 'Morocco', code: 'MA'},
        {name: 'Mozambique', code: 'MZ'},
        {name: 'Myanmar', code: 'MM'},
        {name: 'Namibia', code: 'NA'},
        {name: 'Nauru', code: 'NR'},
        {name: 'Nepal', code: 'NP'},
        {name: 'Netherlands', code: 'NL'},
        {name: 'Netherlands Antilles', code: 'AN'},
        {name: 'New Caledonia', code: 'NC'},
        {name: 'New Zealand', code: 'NZ'},
        {name: 'Nicaragua', code: 'NI'},
        {name: 'Niger', code: 'NE'},
        {name: 'Nigeria', code: 'NG'},
        {name: 'Niue', code: 'NU'},
        {name: 'Norfolk Island', code: 'NF'},
        {name: 'Northern Mariana Islands', code: 'MP'},
        {name: 'Norway', code: 'NO'},
        {name: 'Oman', code: 'OM'},
        {name: 'Pakistan', code: 'PK'},
        {name: 'Palau', code: 'PW'},
        {name: 'Palestinian Territory, Occupied', code: 'PS'},
        {name: 'Panama', code: 'PA'},
        {name: 'Papua New Guinea', code: 'PG'},
        {name: 'Paraguay', code: 'PY'},
        {name: 'Peru', code: 'PE'},
        {name: 'Philippines', code: 'PH'},
        {name: 'Pitcairn', code: 'PN'},
        {name: 'Poland', code: 'PL'},
        {name: 'Portugal', code: 'PT'},
        {name: 'Puerto Rico', code: 'PR'},
        {name: 'Qatar', code: 'QA'},
        {name: 'Reunion', code: 'RE'},
        {name: 'Romania', code: 'RO'},
        {name: 'Russian Federation', code: 'RU'},
        {name: 'Rwanda', code: 'RW'},
        {name: 'Saint Helena', code: 'SH'},
        {name: 'Saint Kitts and Nevis', code: 'KN'},
        {name: 'Saint Lucia', code: 'LC'},
        {name: 'Saint Pierre and Miquelon', code: 'PM'},
        {name: 'Saint Vincent and the Grenadines', code: 'VC'},
        {name: 'Samoa', code: 'WS'},
        {name: 'San Marino', code: 'SM'},
        {name: 'Sao Tome and Principe', code: 'ST'},
        {name: 'Saudi Arabia', code: 'SA'},
        {name: 'Senegal', code: 'SN'},
        {name: 'Serbia and Montenegro', code: 'CS'},
        {name: 'Seychelles', code: 'SC'},
        {name: 'Sierra Leone', code: 'SL'},
        {name: 'Singapore', code: 'SG'},
        {name: 'Slovakia', code: 'SK'},
        {name: 'Slovenia', code: 'SI'},
        {name: 'Solomon Islands', code: 'SB'},
        {name: 'Somalia', code: 'SO'},
        {name: 'South Africa', code: 'ZA'},
        {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
        {name: 'Spain', code: 'ES'},
        {name: 'Sri Lanka', code: 'LK'},
        {name: 'Sudan', code: 'SD'},
        {name: 'Suriname', code: 'SR'},
        {name: 'Svalbard and Jan Mayen', code: 'SJ'},
        {name: 'Swaziland', code: 'SZ'},
        {name: 'Sweden', code: 'SE'},
        {name: 'Switzerland', code: 'CH'},
        {name: 'Syrian Arab Republic', code: 'SY'},
        {name: 'Taiwan, Province of China', code: 'TW'},
        {name: 'Tajikistan', code: 'TJ'},
        {name: 'Tanzania, United Republic of', code: 'TZ'},
        {name: 'Thailand', code: 'TH'},
        {name: 'Timor-Leste', code: 'TL'},
        {name: 'Togo', code: 'TG'},
        {name: 'Tokelau', code: 'TK'},
        {name: 'Tonga', code: 'TO'},
        {name: 'Trinidad and Tobago', code: 'TT'},
        {name: 'Tunisia', code: 'TN'},
        {name: 'Turkey', code: 'TR'},
        {name: 'Turkmenistan', code: 'TM'},
        {name: 'Turks and Caicos Islands', code: 'TC'},
        {name: 'Tuvalu', code: 'TV'},
        {name: 'Uganda', code: 'UG'},
        {name: 'Ukraine', code: 'UA'},
        {name: 'United Arab Emirates', code: 'AE'},
        {name: 'United Kingdom', code: 'GB'},
        {name: 'United States', code: 'US'},
        {name: 'United States Minor Outlying Islands', code: 'UM'},
        {name: 'Uruguay', code: 'UY'},
        {name: 'Uzbekistan', code: 'UZ'},
        {name: 'Vanuatu', code: 'VU'},
        {name: 'Venezuela', code: 'VE'},
        {name: 'Vietnam', code: 'VN'},
        {name: 'Virgin Islands, British', code: 'VG'},
        {name: 'Virgin Islands, U.S.', code: 'VI'},
        {name: 'Wallis and Futuna', code: 'WF'},
        {name: 'Western Sahara', code: 'EH'},
        {name: 'Yemen', code: 'YE'},
        {name: 'Zambia', code: 'ZM'},
        {name: 'Zimbabwe', code: 'ZW'}
  ];
    
    return {
        getCountries : function() {
            return countries;
        }
    };
    }])
    .factory('PrefectureFactory', [function () {
        var Prefecture = ['Hokkaido', 'Tōhoku', 'Kantō', 'Chūbu', 'Kansai', 'Chugoku', 'Shikoku', 'Kyushu'];

        return {
            loadPrefecture: function (state) {
                if(state == 'Hokkaido') {
                    return Prefecture[0];
                }
                else if (state == 'Aomori' || state == 'Iwate' || state == 'Miyagi' || state == 'Akita' || state == 'Yamagata' || state == 'Fukushima') {
                    return Prefecture[1];
                }
                else if (state == 'Ibaraki' || state == 'Tochigi' || state == 'Gunma' || state == 'Saitama' || state == 'Chiba' || state == 'Tokyo' || state == 'Kanagawa') {
                    return Prefecture[2];
                }
                else if (state == 'Niigata' || state == 'Toyama' || state == 'Ishikawa' || state == 'Fukui' || state == 'Yamanashi' || state == 'Nagano' || state == 'Gifu' || state == 'Shizuoka' || state == 'Aichi') {
                    return Prefecture[3];
                }
                else if (state == 'Mie' || state == 'Shiga' || state == 'Kyoto' || state == 'Osaka' || state == 'Hyogo' || state == 'Nara' || state == 'Wakayama') {
                    return Prefecture[4];
                }
                else if (state == 'Tottori' || state == 'Shimane' || state == 'Okayama' || state == 'Hiroshima' || state == 'Yamaguchi') {
                    return Prefecture[5];
                }
                else if (state == 'Tokushima' || state == 'Kagawa' || state == 'Ehime' || state == 'Kochi') {
                    return Prefecture[6];
                }
                else if (state == 'Fukuoka' || state == 'Saga' || state == 'Nagasaki' || state == 'Kumamoto' || state == 'Oita' || state == 'Miyazaki' || state == 'Kagoshima' || state == 'Okinawa') {
                    return Prefecture[7];
                }

                return "";
            }
        }
    }])
   .controller('RegisterCtrl', ['$scope', '$rootScope', '$cookies', '$location', 'toastr', 'RegisterFactory', 'localStorageService', 'LocationsFactory', 'PrefectureFactory', function ($scope, $rootScope, $cookies, $location, toastr, RegisterFactory, localStorageService, LocationsFactory, PrefectureFactory) {
       $scope.countries = LocationsFactory.getCountries();
       var authData = localStorageService.get('authorizationData');
       

       if (authData) { 
           $location.path('/');
       };
       $scope.register = function (account) {
           $('.panel-body').waitMe({
               effect: 'rotation',
               text: '',
               bg: "rgba(255,255,255,0.7)",
               color: "#000"
           });

             var isTrue = false;
             toastr.info("Sending your request to register.");

             if ($scope.account.userName.length < 6) {
                 toastr.error("Username must be atleast 6 characters");
                 isTrue = true;
             }

             if ($scope.account.password.length < 6) {
                 toastr.error("Password must be atleast 6 characters.");
                 isTrue = true;
             }

             if ($scope.account.email.match(/^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*@((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/) == null) {
                 $('.panel-body ').waitMe('hide');
                 toastr.error("Invalid Email '" + $scope.account.email + "'");
                 isTrue = true;
             };
             var reWhiteSpace = new RegExp("/^\s+$/");

           // Check for white space
             if (reWhiteSpace.test($scope.account.userName) || reWhiteSpace.test($scope.account.password)) {
                 toastr.error("Username and Password mustn't contain white spaces.");
                 isTrue = true;
             }

             if(!isEmail()) {
                 toastr.error("Input a valid Email Address.");
                 isTrue = true;
             }

             if ($scope.account.gender == 'Gender') {
                 toastr.error("Select a Gender.");
                 isTrue = true;
             }
             if ($scope.account.location == "Select Country") {
                 toastr.error("Select a Country");
                 isTrue = true;
             }
             if ($scope.account.state == "Select State" || $scope.account.state == "Select Prefecture") {

                 toastr.error("Select a State");
                 isTrue = true;
             }
             if ($scope.account.contactNumber.match(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/) == null) {

                 $('.panel-body ').waitMe('hide');
                 toastr.error("Please Input a valid Contact Number.");

                 console.log($scope.account.contactNumber.match(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/));
                 isTrue = true;
             }
             if ($scope.account.password != $scope.account.confirmPassword) {

                toastr.error("Passwords did not match.");
                isTrue = true;
            }
             if ($scope.account.location == null) {

                toastr.error("Error in getting location.");
                isTrue = true;
            }
            
           // if the variable "isTrue" is equal to true it will return and will not execute the rest of the method
             if (isTrue) {
                 $('.panel-body ').waitMe('hide');
                 return;
             }
            

            RegisterFactory.registers(account).then(function (data) {
                
                $('.panel-body ').waitMe('hide');
                console.log(data);
                toastr.success('Successfully registered. An email notification was sent to your email address');
               $location.path('/');
                $cookies.IsRegister = true;
            }, function (error) {
                $('.panel-body ').waitMe('hide');
                console.log(error);
                switch (error.status) {
        
                    case 500:
                        toastr.error(error.statusText);
                        break;
                    case 400:
                        toastr.error(error.data.ModelState.stateError[0] + ". ");
                        break;
                    default:
                        toastr.error("Something Bad Happen!");
                }   
            });
		};

       var isEmail = function () {
           if ($scope.account.email.match(/^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*@((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/)) {
               return true;
           };
           return false;
       };

		$scope.reset = function() {
			$scope.account = {};
		};
       
       $scope.save = function(account){
           AccountsFactory.update({id:account.accountId}, account);
       };

       $scope.updatePrefecture = function () {
           $scope.account.prefecture = PrefectureFactory.loadPrefecture($scope.account.state);
       };
    }]);
