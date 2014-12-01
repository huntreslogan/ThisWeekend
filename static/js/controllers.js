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

    $scope.orderProp = 'date';

    // alert(currentUser.username);

  }]);

eventControllers.controller('EventDetailCtrl', ['$scope', '$routeParams', '$http', 'currentUser',
  function($scope, $routeParams, $http, currentUser) {
    $scope.eventId = $routeParams.eventId;
    $scope.currentUser= currentUser;
    $http.get(
      '/api/eventdetail/' + $routeParams.eventId
      ).success(function(data) {
        console.log(data);
        $scope.eventdetail = data;
        $scope.save = function(e) {
          // console.log(e);
          $http.post('/savedevent', e, currentUser).success (function(data) {
            console.log("Awesome " + data + currentUser);

        })}

        $scope.share = function(o) {
            var eventdetail = $scope.eventdetail;
            console.log(o);
            console.log(eventdetail);
            console.log([eventdetail, o]);
            var sharethis = [eventdetail,o];
            $http.post('/shareit', sharethis).success(function(data) {
            console.log('Share some' + data);
          })
        }
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
    // alert("Hix " + u.username);
    $http.post('/submituser', u).success(
         function(data) {
         console.log("Flask said " + data);
         // self.wrongpassword = true;

       }
      );

  };


}

]);

// eventControllers.controller('HomeCtrl', [function() {
//   window.location.href = 'http://google.com';
// }] );

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
          $scope.currentUser.username = u.username;
        }
      }
      );
  };

  }

  ]);

eventControllers.controller('savedEventCtrl', ['$scope', '$http',
  function($scope, $http) {
      $scope.savedevents = [];
      $http.get('/modalevents').success (function (data) {
        console.log("in savedEventCtrl");
        console.log(data);
        var savedevents = data;
        $scope.savedevents = savedevents;
        console.log(savedevents);
        var firstevent = savedevents[0];
        $scope.firstevent = firstevent;
        console.log(firstevent.image);
        var image = firstevent.image;
        $scope.image = image;

        // console.log($scope.savedevents[0]);
        // console.log($scope.onesaved);
        // console.log(data[0]);
          // $scope.savedevents = data;
          // console.log(savedevents);
          // $scope.oneevent = savedevents[0];
          // console.log(oneevent);
      });

  }
  ]);



