'use strict';

angular.module('blogApp')
.factory('tokenHandler', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {
  var token = null,
      currentUser;
 
  var tokenHandler = {
    // store our token for later retrieval 
    set: function(v) { token = v; },
    get: function() {
      if (!token) {
        $rootScope.$broadcast('event:unauthorized');
      }
      else {
        return token;
      }
    }
  };
 
  return tokenHandler;
}]);