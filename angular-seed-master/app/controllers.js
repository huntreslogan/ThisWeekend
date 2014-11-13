'use strict';

var eventControllers = angular.module('eventControllers', []);

// eventControllers.controller('EventListCtrl', ['$scope', 'Event',
//   function($scope, Event) {
//     $scope.events = Event.query();
//     $scope.orderProp = 'title';
//   }]);

// eventControllers.controller('EventDetailCtrl', ['$scope', '$routeParams', 'Event',
//   function($scope, $routeParams, Event) {
//     $scope.event = Event.get({eventId: $routeParams.eventId}, function(event) {
//       $scope.mainImageUrl = event.image;
//     });

//     $scope.setImage = function(image) {
//       $scope.mainImageUrl = image;
//     };
//   }]);

eventControllers.controller('EventListCtrl', ['$scope', '$http',
  function($scope, $http) {
    console.log("in events controller");
    $http.get('http://localhost:5000/jsondata/events.json').success(function(data) {
      $scope.events = data;
    });

    $scope.orderProp = 'title';
  }]);

eventControllers.controller('EventDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.eventId = $routeParams.eventId;
    $http.get(
      'http://localhost:5000/events.json/event/' + $routeParams.eventId
      ).success(function(data) {
        console.log(data);
      });
  }]);



