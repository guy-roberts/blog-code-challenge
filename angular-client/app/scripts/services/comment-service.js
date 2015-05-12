'use strict';

angular.module('blogApp')
 .service('CommentService', ['Restangular',  function(Restangular) {

  Restangular.setRequestSuffix('.json');
  Restangular.setBaseUrl('/api/v1');

  this.postComment = function(listOfComments, newComment, success, failure) {
    var promise = listOfComments.post({comment: newComment});
    
    promise.then(success, failure);
    
    return(promise); // for the cg-busy spinner
  };

}]);