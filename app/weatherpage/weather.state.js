/// <reference path="../services/weath-forcast.service .js" />

(function () {
    'use strict';

    angular
        .module('geoWheather.weather', [])
            .config(function ($stateProvider) {
                $stateProvider
                    .state('Weather', {
                        url: "/weather/?lon&lat&searchby",
                        templateUrl: "weatherpage/weather-page.html",
                        controller: 'WeatherCtrl',
                        resolve: {
                            weathNow: ['$stateParams', 'WeatherService', 'AppConstants', function ($stateParams, WeatherService, AppConstants) {
                                return WeatherService.get({ lat: $stateParams.lat, lon: $stateParams.lon, APPID: AppConstants.APIKEY},
                            function (weatherData) {
                                return weatherData.data;
                            });
                            }],
                            forecast: ['$stateParams', 'FiveDaysWeathService', 'AppConstants', function ($stateParams, FiveDaysWeathService, AppConstants) {
                                return FiveDaysWeathService.get({
                                 lat: $stateParams.lat, lon: $stateParams.lon, APPID: AppConstants.APIKEY
                                }, function (weatherData) {
                                   return weatherData;
                                });
                            }]
                        },
                    });
            });

})();