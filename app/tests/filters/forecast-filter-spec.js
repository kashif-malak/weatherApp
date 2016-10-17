describe('test forecast filter functionality', function () {

    var $filter;
    var input = [{
        "dt": 1477105200,
        "main": {
            "temp": 6.37,
            "temp_min": 6.37,
            "temp_max": 6.37,
            "pressure": 1020.57,
            "sea_level": 1028.36,
            "grnd_level": 1020.57,
            "humidity": 100,
            "temp_kf": 0
        },
        "weather": [
           {
               "id": 801,
               "main": "Clouds",
               "description": "few clouds",
               "icon": "02n"
           }
        ],
        "clouds": {
            "all": 12
        },
        "wind": {
            "speed": 2.56,
            "deg": 9.50211
        },
        "rain": {

        },
        "sys": {
            "pod": "n"
        },
        "dt_txt": "2016-10-22 03:00:00"
    },
    {
        "dt": 1477116000,
        "main": {
            "temp": 6.63,
            "temp_min": 6.63,
            "temp_max": 6.63,
            "pressure": 1019.47,
            "sea_level": 1027.18,
            "grnd_level": 1019.47,
            "humidity": 100,
            "temp_kf": 0
        },
        "weather": [
           {
               "id": 802,
               "main": "Clouds",
               "description": "scattered clouds",
               "icon": "03n"
           }
        ],
        "clouds": {
            "all": 32
        },
        "wind": {
            "speed": 2.86,
            "deg": 37.5006
        },
        "rain": {

        },
        "sys": {
            "pod": "n"
        },
        "dt_txt": "2016-10-22 06:00:00"
    },
    {
        "dt": 1477126800,
        "main": {
            "temp": 10.44,
            "temp_min": 10.44,
            "temp_max": 10.44,
            "pressure": 1019.15,
            "sea_level": 1026.71,
            "grnd_level": 1019.15,
            "humidity": 88,
            "temp_kf": 0
        },
        "weather": [
           {
               "id": 500,
               "main": "Rain",
               "description": "light rain",
               "icon": "10d"
           }
        ],
        "clouds": {
            "all": 24
        },
        "wind": {
            "speed": 3.11,
            "deg": 52.0007
        },
        "rain": {
            "3h": 0.02
        },
        "sys": {
            "pod": "d"
        },
        "dt_txt": "2016-10-22 09:00:00"
    },
    {
        "dt": 1477137600,
        "main": {
            "temp": 14.08,
            "temp_min": 14.08,
            "temp_max": 14.08,
            "pressure": 1018.06,
            "sea_level": 1025.53,
            "grnd_level": 1018.06,
            "humidity": 72,
            "temp_kf": 0
        },
        "weather": [
           {
               "id": 801,
               "main": "Clouds",
               "description": "few clouds",
               "icon": "02d"
           }
        ],
        "clouds": {
            "all": 24
        },
        "wind": {
            "speed": 3.11,
            "deg": 69.5013
        },
        "rain": {

        },
        "sys": {
            "pod": "d"
        },
        "dt_txt": "2016-10-21 12:00:00"
    }
    ];

    var output = [{
        date: "2016-10-21",
        icon: "02d",
        max: 14,
        min: 14
    }];
    beforeEach(function () {
        module('ui.router');
        module('geoWeather.weather');

        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should sanitize the array', function () {
  
        var result;
        result = $filter('forecastFilter')(input);

        expect(result).toEqual(output);
    });
});

