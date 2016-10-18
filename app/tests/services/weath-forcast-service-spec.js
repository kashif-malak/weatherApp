describe('it connect to api.openweathermap.org/data/2.5 ', function () {
    
    var mockUserResource, $httpBackend, serviceEndPoint;
    beforeEach(angular.mock.module('geoWeather'));
    
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
           
            $httpBackend = $injector.get('$httpBackend');
            mockService = $injector.get('WeatherjsonpSvc');
            appConstants = $injector.get('AppConstants');
            $templateCache = $injector.get('$templateCache');
            $templateCache.put('main/main.html', 'main.html');
            $templateCache.put('weatherpage/weather-page.html', 'weather-page.html');
         
            serviceEndPoint = appConstants.OPENWEATH_URL + "/weather?APPID=" + appConstants.APIKEY;

        })
    });

    describe('city name', function () {
        it('call weatherservice by city name and get London', function () {
          $httpBackend.whenJSONP(serviceEndPoint + "&q=LONDON&units=metric&callback=JSON_CALLBACK")
          .respond({city:'LONDON' });
            mockService.findByCityName('LONDON').then(function(response){
                $httpBackend.flush();
                expect(response).toBe({city:'LONDON' });
            });
            });
    });

    describe('city  by Position', function () {
        it('call weatherservice by city name and get London', function () {
            $httpBackend.whenJSONP(serviceEndPoint + "&q=LONDON&units=metric&callback=JSON_CALLBACK")
            .respond({ city: 'LONDON' });
            mockService.findByPosition({lan:100,lat:200}).then(function (response) {
                $httpBackend.flush();
                expect(response).toBe({ city: 'LONDON' });
            });

        });
    });

    describe('weather forecast by Position', function () {
        it('call weather forecast by position', function () {
            $httpBackend.whenJSONP(appConstants.OPENWEATH_URL + "/forecast/daily?APPID=" + appConstants.APIKEY + "&lat=200&lon=100&units=metric&callback=JSON_CALLBACK")
            .respond([{ dt: 24052251, min: 8, max: 15, city: 'LONDON' }, { dt: 24052251, min: 8, max: 15, city: 'LONDON' }]);
            mockService.findByPosition({ lan: 100, lat: 200 }).then(function (response) {
                $httpBackend.flush();
                expect(response).toBe([{ dt: 24052251, min: 8, max: 15, city: 'LONDON' }, { dt: 24052251, min: 8, max: 15, city: 'LONDON' }]);
            });

        });
    });
});

