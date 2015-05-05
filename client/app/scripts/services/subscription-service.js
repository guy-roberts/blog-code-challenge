'use strict';

angular.module('blogApp')
 .service('SubscriptionService', ['Restangular',  function(Restangular) {

  Restangular.setRequestSuffix('.json');
  Restangular.setBaseUrl('/api/v1');

  this.postSubscription = function(listOfSubscriptions, newSubscription, success, failure) {  
	  var promise = listOfSubscriptions.post({subscription: newSubscription});
    
    promise.then(success, failure);

    return(promise); // for the cg-busy spinner
  };

  this.listOfSubscriptions = function(blog, success, failure) {
	  var promise = blog.getList('subscriptions');
    
    promise.then(success, failure);
    
    return(promise); // for the cg-busy spinner
  };
}]);