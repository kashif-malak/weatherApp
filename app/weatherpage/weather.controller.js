

(function () {
    'user strict'

    angular
        .module('geoWeather.weather')
    .controller('WeatherCtrl', function ($scope, weathNow, $filter, forecast, WeatherjsonpSvc, $state, $stateParams) {

        $scope.forecast = forecast.list;
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