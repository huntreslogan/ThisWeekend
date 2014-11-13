// 'use strict';

// /* Services */

// var eventServices = angular.module('eventServices', ['ngResource']);

// eventServices.factory('Event', ['$resource',
//   function($resource){
//     return $resource('events/:eventId.json', {}, {
//       query: {method:'GET', params:{eventId:'events'}, isArray:true}
//     });
//   }]);