
describe('Test Main Controller', function () {
    var scope, ctrl, httpBackend, appConstants, serviceEndPoint;

    beforeEach(module("geoWeather"));
    beforeEach(module("geoWeather.main"));

    beforeEach(
      inject(
        function ($controller, $rootScope, WeatherjsonpSvc, $httpBackend, $templateCache) {
            httpBackend = $httpBackend;
            $templateCache.put('main/main.html', 'main.html');
            $templateCache.put('weatherpage/weather-page.html', 'weather-page.html');
            scope = $rootScope.$new();
            serviceEndPoint = "http://api.openweathermap.org/data/2.5/weather?APPID=66a3d0941e614b3050f05912a908b65b &q=LONDON&units=metric&callback=JSON_CALLBACK";
            ctrl = $controller("MainCtrl", {
                $scope: scope, WeatherjsonpSvc: WeatherjsonpSvc
            });

            var url = serviceEndPoint +
            httpBackend.whenJSONP(url).respond({ coord: { lat: 50 } });
        }
      )
    );

    it('should test searchHander method', function () {
            scope.searchHandler("LONDON");
            httpBackend.flush();
          
                expect().toBe({ coord: { lat: 50 } });
            

    });

});