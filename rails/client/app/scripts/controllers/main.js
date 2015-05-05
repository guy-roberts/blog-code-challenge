'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:MainController
 * @description
 * # MainController
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('MainController', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
