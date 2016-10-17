
(function () {
    'user strict'

    angular.module('geoWeather.weather')


    .filter('forecastFilter', function () {
       
        return function (weatherData) {
            var result = [];
            weatherData.$promise.then(function (weather) {

                if (weather.data.list != null) {
                    weather.data.list.forEach(function (alem,index,arr) {
                        var date = alem.dt_txt.slice(0, 10);
                        if (!this[date]) {
                            this[date] = { date: date, max: 0, min : 0 };
                            result.push(this[date]);
                        }
                        this[date].max = Math.round( Math.max(this[date].max, alem.main.temp_max));
                        this[date].min = Math.round( Math.min(this[date].max, alem.main.temp_min));
                        this[date].icon = arr[index].weather[0].icon;
                    }, Object.create(null));

                    result.splice(0, 1);

                };
            });

           
            return result;
        }

    });

})();