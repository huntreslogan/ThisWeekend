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
    $http.get('/api/events').success(function(data) {
      $scope.events = data;
    });

    $scope.orderProp = 'title';
  }]);

eventControllers.controller('EventDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.eventId = $routeParams.eventId;
    $http.get(
      '/api/eventdetail/' + $routeParams.eventId
      ).success(function(data) {
        console.log(data);
        $scope.eventdetail = data;
      });
  }]);

eventControllers.controller('HomeCtrl', ['$scope', '$http',
  function ($scope, $http) {
  console.log("in home");
  $scope.user = {};

  $scope.reset = function (u) {
    $scope.user = {};
    $scope.user.email = "";
    console.log("huh?");
  };

  $scope.update = function(u) {
    alert("Hi " + u.name);
     $http.post('/some/path/to/your/flask/login', u).success(
         function(data) {
         alert("Flask said " + data);
         $scope.wrongpassword = true;
       }
      );

  };


}]);




