'use strict';

angular.module('blogApp')
 .service('BlogService', ['Restangular',  function(Restangular) {

  Restangular.setRequestSuffix('.json');
  Restangular.setBaseUrl('/api/v1');

  this.listOfBlogs = function(success, failure) {
    var promise = Restangular.all('blogs').getList();
    
    promise.then(success, failure);
    
    return(promise); // for the cg-busy spinner
  };

}]);