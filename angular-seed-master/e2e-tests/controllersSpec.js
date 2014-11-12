'use strict';

/* jasmine specs for controllers go here */
describe('event controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('myApp'));
  beforeEach(module('eventServices'));

  describe('EventListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('events/events.json').
          respond([{title: 'The Starship Connection'}, {title: 'Washed Out DJ-set'}]);

      scope = $rootScope.$new();
      ctrl = $controller('EventListCtrl', {$scope: scope});
    }));


    it('should create "events" model with 2 events fetched from xhr', function() {
      expect(scope.events).toEqualData([]);
      $httpBackend.flush();

      expect(scope.events).toEqualData(
          [{title: 'The Starship Connection'}, {title: 'Washed Out DJ-set'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('title');
    });
  });


  describe('EventDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xyzEventData = function() {
          return {
            title: 'event xyz',
                images: ['image/url1.png', 'image/url2.png']
          };
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('events/xyz.json').respond(xyzEventData());

      $routeParams.eventId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('EventDetailCtrl', {$scope: scope});
    }));


    it('should fetch event detail', function() {
      expect(scope.event).toEqualData({});
      $httpBackend.flush();

      expect(scope.event).toEqualData(xyzEventData());
    });
  });
});