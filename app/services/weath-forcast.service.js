(function () {
    angular
        .module('geoWeather')

    .factory("WeatherjsonpSvc", ['$q', '$http', 'AppConstants', function ($q, $http, AppConstants) {

        var SERVICE_ENDPOINT = AppConstants.OPENWEATH_URL;
        var JSON_P_SUFFIX = "&callback=JSON_CALLBACK"
        var APPID = AppConstants.APIKEY;

        return {
            findByPosition: byfindByPositionFunc,
            findByCityName: findByCityNameFunc,
            findByZipCode: findByZipCodeFunc,
            findByCityCode: findByCityCodeFunc,
            weatherForcast: forecast
        };

       function request(path) {
            var deferred = $q.defer();

            $http.jsonp(SERVICE_ENDPOINT + path + JSON_P_SUFFIX).
              success(function (data, status, headers, config) {
                  deferred.resolve(data);
              }).
              error(function (data, status, headers, config) {
                  deferred.reject(data);
              })

            return deferred.promise;
        };

        var normalizeDays = function (days) {
            var d = days;

            if (days === undefined || days === null || parseInt(days) < 1) d = 5;
            if (d > 5) d = 5; // max 5 days

            return d;
        };

       
           
        function byfindByPositionFunc (lat, lng) {
            var path = "/weather?APPID=" + APPID + "&lat=" + lat + "&lon=" + lng;
            return request(path);
        };
        function findByCityNameFunc (cityName) {
            var path = "/weather?APPID=" +APPID + "&q=" + cityName;
            return request(path);
        };
        function findByZipCodeFunc(zip) {
            var path = "/weather?APPID=" + APPID + "&zip=" + zip;
            return request(path);
        };
        function findByCityCodeFunc(code) {
            var path = "/weather?APPID=" + APPID + "&id=" + code;
            return request(path);
        };

        

         var forecast =  {
            byPosition: function (lat, lng, days, units) {
                var u = units || 'metric'; 
                var d = normalizeDays(days);
                var path = "/forecast/daily?APPID=" + APPID + "&lat=" + lat + "&lon=" + lng + d +  "&units=metric";
                return request(path);
            },
            byCity: function (cityName, days, units) {
                var u = units || 'metric'; 
                var d = normalizeDays(days);

                var path = "/forecast/daily?APPID=" + APPID + "&q=" + cityName + "&cnt=" + d + "&units=metric&mode=json";
                return request(path);
            },
            byCityId: function (cityId, days, units) {
                var u = units || 'metric'; 
                var d = normalizeDays(days);

                var path = "/forecast/daily?APPID=" + APPID + "&id=" + cityId + "&cnt=" + d + "&units=metric&mode=json";
                return request(path);
            }
 
        };
       
    }]);
})();