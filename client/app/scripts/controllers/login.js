'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:LoginController
 * @description
 * # LoginController
 * Controller of the blogApp
 */
angular.module('blogApp')
  // Our login controller that will handle 
  .controller('LoginController', ['$location', '$scope', '$http', 'tokenHandler', '$rootScope', 'Restangular', function ($location, $scope, $http, tokenHandler, $rootScope, Restangular) {

		Restangular.addFullRequestInterceptor(function (data, operation, what, url, headers, params, element, httpConfig) {
		  var ret={};
		
      ret.headers = angular.extend(headers, tokenHandler.get() );
      return ret;
		});
			
    // login action
    $scope.login = function() {
      // Post to our api sign_in route
      $http({
        url: '/api/v1/users/sign_in',
        method: 'POST',
        data: { user: $scope.user }
      }).success(function(data) {
        if (data.success) {
          // If we get back an authenticated user (indicated by
          // the success in the response, not if the response 
          // returns 401 - so we can capture the user errors
					$rootScope.$broadcast('event:authenticated');				
          $scope.ngModel = data.data.data;
					tokenHandler.set(data.data);

          $location.path('/client-list');
        } else {
          $scope.ngModel = data;
          $scope.user.errors = data.info;
        }
      });
    };
}]);