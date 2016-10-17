
(function () {
    'use strict';

    angular
        .module('geoWeather.weather', [])
            .config(function ($stateProvider) {
                $stateProvider
                    .state('Weather', {
                        url: "/weather/?lon&lat&searchby",
                        templateUrl: "weatherpage/weather-page.html",
                        controller: 'WeatherCtrl',
                        resolve: {
                            weathNow: ['$stateParams', 'WeatherjsonpSvc', function ($stateParams, WeatherjsonpSvc) {
                                      return WeatherjsonpSvc.findByPosition($stateParams.lat, $stateParams.lon )
                            }],
                            forecast: ['$stateParams', 'WeatherjsonpSvc',  function ($stateParams, WeatherjsonpSvc) {
                                      return WeatherjsonpSvc.weatherForcast($stateParams.lat, $stateParams.lon);
                            }]
                        },
                    });
            });
})();