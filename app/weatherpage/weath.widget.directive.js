(function () {
    angular
        .module("geoWeather.weather")

    .directive('weatherWidget', function () {
        return {
            restrict: 'EA',
            templateUrl: 'weatherpage/weath-widget.tpl.html',
            replace: true,
            scope: {
                weather      : '=',
                forecastlist : '='
            },
            link: function (scope, elem, attrs) {
                scope.today = Date.now();
              
            }
        };

    });

})();