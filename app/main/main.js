
(function () {
    'use strict';

    angular.module('geoWeather.main', [])
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

                    $scope.searchHandler = function (searchTerm) {

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