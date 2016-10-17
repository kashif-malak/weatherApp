describe('it connect to api.openweathermap.org/data/2.5 ', function () {

    var mockUserResource, $httpBackend;
    beforeEach(angular.mock.module('geoWeather'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            mockResource = $injector.get('WeatherjsonpSvc');
        })
    });

    describe('call weather service using city name', function () {
        it('should call weatherservice by city name and get London', inject(function (User) {
            $httpBackend.expectGET('/api/index.php/users/test')
                .respond([{
                    username: 'test'
                }]);

            var result = mockUserResource.getUser('test');

            $httpBackend.flush();

            expect(result[0].username).toEqual('test');
        }));

    });
});