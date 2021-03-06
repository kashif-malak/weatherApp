(function () {
    'use strict';

    angular.module('geoWeather', [
      'ui.router',
      'ngAnimate',
      'geoWeather.main',
      'geoWeather.weather',
    ])
          .run(function ($rootScope, $window, GeolocationService, $state,$location) {
              $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
 
                  if (toState.url =='/index') {
                        if (!navigator.geolocation) {                     
                          return;
                      }
                  };
              });
          })

        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $urlRouterProvider.otherwise('/index');
            $stateProvider.state('site', {
                url: "/index",
                templateUrl: "main/main.html",
                controller: 'MainCtrl',
            });
        });
})();


