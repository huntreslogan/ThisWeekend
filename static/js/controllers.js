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

eventControllers.controller('SignupCtrl', ['$scope', '$http',
  function ($scope, $http) {
  console.log("in home");
  console.log($scope.user);
  $scope.reset = function (u) {
    $scope.user.email = "";
    console.log("huh?");
  };

  $scope.submit = function(u) {
    alert("Hi " + u.username);
    $http.post('/submituser', u).success(
         function(data) {
         console.log("Flask said " + data);
         // self.wrongpassword = true;

       }
      );

  };


}

]);

eventControllers.controller('HomeCtrl', []);


