'use strict';
import angular from 'angular';

angular.module('core').controller('HomeController', ['$scope',
  function ($scope) {
    
    $scope.name = "Hello World;

  }
]);