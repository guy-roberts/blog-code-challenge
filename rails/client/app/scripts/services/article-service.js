'use strict';

angular.module('blogApp')
 .service('ArticleService', ['Restangular',  function(Restangular) {

  Restangular.setRequestSuffix('.json');
  Restangular.setBaseUrl('/api/v1');

  this.listOfArticles = function(success, failure) {
    var promise = Restangular.all('articles').getList();
    
    promise.then(success, failure);
    
    return(promise); // for the cg-busy spinner
  };

}]);