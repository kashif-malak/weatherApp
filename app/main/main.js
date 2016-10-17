
(function () {
    'use strict';

    angular.module('geoWeather.main', ['ui.router'])
    .controller('MainCtrl', 
                function ($scope, GeolocationService, $window, $state, WeatherjsonpSvc) {

                    $scope.geolocNotSupported = false
                    $scope.geolocPermDenied = false;
                    $scope.position = null;
                    $scope.message = '';


                    if ( $window.navigator) {   /* geolocation available  */

                        GeolocationService().then(function (position) {
                            $state.go('Weather', { lon: position.lon,lat:position.lat,searchby:'coords'});
                        }, function (reason) {
                            $scope.geolocPermDenied = true;
                        });

                    } else {
                        $scope.geolocNotSupported = true;  /* geolocation IS NOT available */
                    }

                    //if ($window.navigator.permissions.query({ 'name': 'geolocation' })
                    //    .then(function (permission) {
                    //    console.log(permission);

                    //    switch (permission.state) {
                    //    case 'granted':
                    //     $state.go('Weather', { });
                    //        break;

                    //    case 'denied':
                    //    $scope.geolocPermDenied = true;
                    //        break;

                    //    case 'prompt':
                    //    alert('Please allow geolocation to access your location data.');
                    //        break;
                    //    default:

                    //    };
                    //}));

                    $scope.searchHandler = function (searchTerm) {
                        console.log(searchTerm);
                        if (isNaN(searchTerm)) {
                            WeatherjsonpSvc.findByCityName(searchTerm)
                                                .then(success, error);

                        } else {
                            WeatherjsonpSvc.findByCityCode(searchTerm)
                                              .then(success, error);
                        };

                        function success(data) {
                            $state.go("Weather", { lon: data.coord.lon, lat: data.coord.lat, searchby: 'city' });
                        };
                        function error(data) {
                            alert('Error in locating you place');
                        };

                    };

 

                   
                 

                });
})();