(function() {
    'use strict';

    angular
        .module('geoWeather')
        .factory('FiveDaysWeathService', Weather);

    Weather.$inject = ['$resource'];

    function Weather($resource) {
        //$resource.defaults.useXDomain = true;
        var service = $resource('http://api.openweathermap.org/data/2.5/forecast?units=metric', {}, {
            'get': {
                method: 'GET', params: {
                    lat: '',
                    lon: '',
                    APPID: ''
                }, isArray: false,
                interceptor: {
                    response: function(response) {
                        // expose response
                        return response;
                    }
                }
            }
        });

        return service;
    }
})();
