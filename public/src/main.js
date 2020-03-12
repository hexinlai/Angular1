import angular from 'angular';
import * from 'angular-route';

angular.
  module('core').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          templateUrl: 'templates/home',
          controller: 'controllers/HomeController'
        }).
        when('/comments', {
          templateUrl: 'templates/comments',
          controller: 'controllers/HomeController'
        }).
        otherwise('/error', {
          templateUrl: 'templates/error',
          controller: 'controllers/HomeController'
        });
    }
  ]);
  //can use $stateProvider instead