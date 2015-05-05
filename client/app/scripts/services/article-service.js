'use strict';

angular.module('blogApp')
 .service('ArticleService', ['Restangular',  function(Restangular) {

  Restangular.setRequestSuffix('.json');
  Restangular.setBaseUrl('/api/v1');

  this.listOfArticlesForBlog = function(blog, success, failure) {
    var promise = blog.getList('articles');
    
    promise.then(success, failure);
    
    return(promise); // for the cg-busy spinner
  };

  this.listOfCommentsForAnArticle = function(article, success, failure) {
    var promise = article.getList('comments');
    
    promise.then(success, failure);
    
    return(promise); // for the cg-busy spinner
  };
}]);