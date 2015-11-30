'use strict';

angular.module('knapsackApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/knapsack.html',
        controller: 'KnapsackController',
        controllerAs: 'ws'
      });
  });
