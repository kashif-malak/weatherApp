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

    .factory('ZipCodeLookupSvc', [
      '$q', '$http', 'GeolocationSvc',
      function ($q, $http, GeolocationSvc) {
          var MAPS_ENDPOINT = 'http://maps.google.com/maps/api/geocode/json?latlng={POSITION}&sensor=false';

          return {
              urlForLatLng: function (lat, lng) {
                  return MAPS_ENDPOINT.replace('{POSITION}', lat + ',' + lng);
              },

              lookupByLatLng: function (lat, lng) {
                  var deferred = $q.defer();
                  var url = this.urlForLatLng(lat, lng);

                  $http.get(url).success(function (response) {
                      // hacky
                      var zipCode;
                      angular.forEach(response.results, function (result) {
                          if (result.types[0] === 'postal_code') {
                              zipCode = result.address_components[0].short_name;
                          }
                      });
                      deferred.resolve(zipCode);
                  }).error(deferred.reject);

                  return deferred.promise;
              },

              lookup: function () {
                  var deferred = $q.defer();
                  var self = this;

                  GeolocationSvc().then(function (position) {
                      deferred.resolve(self.lookupByLatLng(position.lat, position.lng));
                  }, deferred.reject);

                  return deferred.promise;
              }
          };
      }
    ])


})();
