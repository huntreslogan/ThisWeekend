'use strict';

/* App Module */

var myApp = angular.module('myApp', [
  'ngRoute',
  'eventAnimations',
  'eventControllers',
  'eventFilters',
  'eventServices'
]);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/signup', {
        templateUrl: '/static/partials/signup.html',
        controller:'SignupCtrl'
      }).
      when('/login', {
        templateUrl: 'static/partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/events', {
        templateUrl: '/static/partials/eventList.html',
        controller: 'EventListCtrl'
      }).
      when("/eventdetail/:eventId", {
        templateUrl: '/static/partials/eventDetails.html',
        controller: 'EventDetailCtrl'
      }).
      otherwise({
        redirectTo: '/events'
      });
  }
]
);



