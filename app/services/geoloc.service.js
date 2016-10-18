(function () {
    'use strict';

    angular.module('geoWeather')

    .factory('GeolocationService', [
      '$q', '$window',
      function ($q, $window) {
          return function () {
              var deferred = $q.defer();

              if (!$window.navigator) {
                  deferred.reject(new Error('Geolocation is not supported'));
              } else {
                  $window.navigator.geolocation.getCurrentPosition(function (position) {
                      deferred.resolve({
                          lat: position.coords.latitude,
                          lon: position.coords.longitude
                      });
                  }, deferred.reject);
              }

              return deferred.promise;
          };
      }])

})();
