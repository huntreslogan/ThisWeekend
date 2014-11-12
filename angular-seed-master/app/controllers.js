'use strict';

var eventControllers = angular.module('eventControllers', []);

eventControllers.controller('EventListCtrl', ['$scope', 'Event',
  function($scope, Event) {
    $scope.events = Event.query();
    $scope.orderProp = 'title';
  }]);

eventControllers.controller('EventDetailCtrl', ['$scope', '$routeParams', 'Event',
  function($scope, $routeParams, Event) {
    $scope.event = Event.get({eventId: $routeParams.eventId}, function(event) {
      $scope.mainImageUrl = event.image;
    });

    $scope.setImage = function(image) {
      $scope.mainImageUrl = image;
    };
  }]);