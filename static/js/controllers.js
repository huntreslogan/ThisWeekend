'use strict';

var eventControllers = angular.module('eventControllers', []);

//Create controller module to request data from the server for each event in database
//Sets data equal to variable events and binds events to the scope
//Sets orderProp equal to date so that we can repeat our events in the event list template with ng-repeat and order by the attribute date

eventControllers.controller('EventListCtrl', ['$scope', '$http', "currentUser",
  function($scope, $http, currentUser) {
    $http.get('/api/events').success(function(data) {
      $scope.events = data;
    });

    $scope.orderProp = 'date';

  }]);


//Creates controller for our event details and uses the event Id parameter to request data from the server
//The variable eventDetail is set equal to the data returned from the server and can be used in our event detail view
//The save function posts the event being viewed by the user to the server
//The server then places the event in an association table created to hold each user's saved events for later viewing
//The events can be accessed by selecting the saved events link in the navbar which displays the user's saved events in a drop-down modal
//Share allows the user to share the event with other user's by submiting their username, which causes a post to server and the event is placed into that user's saved events table


eventControllers.controller('EventDetailCtrl', ['$scope', '$routeParams', '$http', 'currentUser',
  function($scope, $routeParams, $http, currentUser) {
    $scope.eventId = $routeParams.eventId;
    $scope.currentUser= currentUser;
    $http.get(
      '/api/eventdetail/' + $routeParams.eventId
      ).success(function(data) {
        $scope.eventdetail = data;
        $scope.save = function(e) {
          $http.post('/savedevent', e, currentUser).success (function(data) {

        })}

        $scope.share = function(o) {
            var eventdetail = $scope.eventdetail;
            var sharethis = [eventdetail,o];
            $http.post('/shareit', sharethis).success(function(data) {
          })
        }
      });

  }]);

//Once the user submits their username and email the data is posted to the server and saved in a database table named users

eventControllers.controller('SignupCtrl', ['$scope', '$http',
  function ($scope, $http) {

  $scope.reset = function (u) {
    $scope.user = {};
  };

  $scope.submit = function(u) {
    $http.post('/submituser', u).success(
         function(data) {
         alert("Welcome!")
       }
      );

  };


}

]);



eventControllers.controller('LoginCtrl', ['$scope', '$http', 'currentUser',
  function ($scope, $http, currentUser){

  $scope.login = function (u) {

    $http.post('/login', u).success(
      function(data) {
        if (data == "Please enter correct password") {
         alert("Please submit correct password");
        }else {
          alert("Welcome" + $scope.currentUser.username);
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
        var savedevents = data;
        $scope.savedevents = savedevents;
        var firstevent = savedevents[0];
        $scope.firstevent = firstevent;
        var image = firstevent.image;
        $scope.image = image;

      });

  }
  ]);



