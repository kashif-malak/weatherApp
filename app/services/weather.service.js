(function() {
    'use strict';

    angular
        .module('geoWheather')
        .factory('WeatherService', Weather);

    Weather.$inject = ['$resource'];

    function Weather($resource) {

    

        //$resource.defaults.useXDomain = true;
        var service = $resource('http://api.openweathermap.org/data/2.5/weather', {}, {
            'get': {
                method: 'GET', params: { lat: '', lon: '', APPID: '',  units:'metric'}, isArray: false,
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.wind.deg = parseInt(data.wind.deg);
                    data.main.temp = parseInt( data.main.temp);
                    return data;
                }
            }
        });

        return service;
    }
})();
