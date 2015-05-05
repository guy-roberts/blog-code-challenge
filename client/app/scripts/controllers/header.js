'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the blogApp
 */
angular.module('blogApp')
	.controller('HeaderController', ['$scope', '$http', '$rootScope', '$location', 'tokenHandler', 'Restangular', 
	  function HeaderCtrl($scope, $http, $rootScope, $location, tokenHandler, Restangular) 
	{ 
	  $scope.authenticated = false;

		// Find out if Rails thinks we are authenticated to start with. For instance after the page has refreshed.
		// TODO How about using current_user ?
		$scope.areWeAuthenticatedWithRails = function() {
		  Restangular.setRequestSuffix('.json');
			Restangular.setBaseUrl('/api/v1');
			var promise = Restangular.all('people');

		  promise.getList().then( function() {
				$scope.authenticated = true;
			}, 	function errorCallBack() {
				$scope.authenticated = false;
			});
		};

	  $scope.areWeAuthenticatedWithRails();

		$scope.$on('event:authenticated', function(event){
			$scope.authenticated = true;
	  });

		$scope.$on('event:signedout', function(event){
			$scope.authenticated = false;
	  });
	
		// viewLocationList is a comma separated list of locations that should be active.
		// It is a list so that multiple items on a sub menu can make their parent menu
		// active.
		$scope.isActive = function (viewLocationList) { 
			var locations = viewLocationList.split(',');
			var matched = false;

			locations.forEach( function(word) {
				if (word === $location.path()) {
					matched = true;
				}
			});
		
		  return matched;
		};
	
	  $scope.logout = function() {
	
	    $http({
	      url: '/api/v1/users/sign_out',
	      method: 'DELETE'

	    }).success(function(data) {
	      if (data.success) { 
	        //$scope.ngModel = nil
	        tokenHandler.set({});
					$rootScope.$broadcast('event:signedout');
				
	        $location.path('/');
	      } else {

					console.log('Failed to logout');
	      }
	    });
	  };

	  $scope.showMenu = function () {
		  return($location.path() !== '/home');
	  };

	}]);