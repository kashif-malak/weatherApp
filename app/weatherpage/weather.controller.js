/// <reference path="../services/weath-forcast.service.js" />

(function () {
    'user strict'

    angular
        .module('geoWheather.weather')
    .controller('WeatherCtrl', function ($scope, weathNow, $filter, forecast, WeatherjsonpSvc,$state) {

        $scope.forecast = $filter('forecastFilter')(forecast);
        $scope.weath = weathNow;
        
        $scope.searchHandler = function (searchTerm) {

            if (isNaN(searchTerm)) {
                WeatherjsonpSvc.findByCityName(searchTerm)
                                    .then(success, error);
                
            } else {
                WeatherjsonpSvc.findByCityCode(searchTerm)
                                  .then(success, error);
            };

            function success(data) {
               // $state.go('Weather', { lon: data.coord.lon, lat: data.coord.lat, searchby: 'city' });
                $state.go($state.current, { lon: data.coord.lon, lat: data.coord.lat, searchby: 'city' }, { reload: true });
            };
            function error(data) {
                alert('Error in locating you place');
            };

        };
    });

})();