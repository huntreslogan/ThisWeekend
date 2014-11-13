'use strict';

/* App Module */

var myApp = angular.module('myApp', [
  'ngRoute',
  'eventAnimations',
  'eventControllers',
  'eventFilters',
]);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/events', {
        templateUrl: 'partials/eventList.html',
        controller: 'EventListCtrl'
      }).
      when("/events.json/event/:eventId", {
        templateUrl: 'partials/eventDetails.html',
        controller: 'EventDetailCtrl'
      }).
      otherwise({
        redirectTo: '/events'
      });
  }]);

