var eventDirectives = angular.module('eventDirectives', []);

  eventDirectives.controller('DialogController', ['$scope','$timeout', function($scope, $timeout) {
    $scope.name = 'Tobias';
    $scope.hideDialog = function () {
      $scope.dialogIsHidden = true;
      $timeout(function () {
        $scope.dialogIsHidden = false;
      }, 2000);
    };
  }]).directive('myDialog', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        'close': '&onClose'
      },
      templateUrl: '/static/partials/my-dialog-close.html'
    };
  });