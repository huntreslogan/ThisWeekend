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
      when('/home', {
        templateUrl: '/static/partials/home.html',
        controller: 'HomeCtrl',
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
        redirectTo: '/home'
      });
  }]);



