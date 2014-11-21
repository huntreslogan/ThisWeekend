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

eventControllers.controller('EventListCtrl', ['$scope', '$http', "currentUser",
  function($scope, $http, currentUser) {
    console.log("in events controller");
    $http.get('/api/events').success(function(data) {
      $scope.events = data;
    });

    $scope.orderProp = 'title';

    alert(currentUser.username);

  }]);

eventControllers.controller('EventDetailCtrl', ['$scope', '$routeParams', '$http', 'currentUser', 'eventData',
  function($scope, $routeParams, $http, currentUser, eventData) {
    $scope.eventId = $routeParams.eventId;
    $scope.currentUser= currentUser;
    $http.get(
      '/api/eventdetail/' + $routeParams.eventId
      ).success(function(data) {
        // console.log(data);
        $scope.eventdetail = data;
        $scope.save = function(e) {
          console.log(e);
          $http.post('/savedevent', e, currentUser).success (function(data) {
            console.log("Derp di derp!" + data + currentUser);
        })}
      });

  }]);

eventControllers.controller('SignupCtrl', ['$scope', '$http',
  function ($scope, $http) {
  console.log("in home");

  $scope.reset = function (u) {
    $scope.user = {};
    console.log("huh?");
  };

  $scope.submit = function(u) {
    alert("Hix " + u.username);
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

eventControllers.controller('LoginCtrl', ['$scope', '$http', 'currentUser',
  function ($scope, $http, currentUser){

    console.log('in login');

    // $scope.currentUser = currentUser;
    // $scope.currentUser = {'username': ''}

  $scope.login = function (u) {

    $http.post('/login', u).success(
      function(data) {
        console.log("whatup");
        alert("Welcome " + u.username);
        if (data == "Please enter correct password") {
          alert("Please enter correct password");
        }else {
          alert("Thank you for logging in!");
          currentUser.username = u.username;
        }
      }
      );
  };

  }

  ]);



