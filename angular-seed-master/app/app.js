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
      when('/events', {
        templateUrl: 'partials/view1.html',
        controller: 'EventListCtrl'
      }).
      when('/events/:eventId', {
        templateUrl: 'partials/eventDetails.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/events'
      });
  }]);

