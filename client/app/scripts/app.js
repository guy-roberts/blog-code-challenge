'use strict';

/**
 * @ngdoc overview
 * @name blogApp
 * @description
 * # blogApp
 *
 * Main module of the application.
 */
angular
  .module('blogApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular'
  ])
 .config(['$routeProvider', function ($routeProvider) {
   $routeProvider
     .when('/', {
       templateUrl: 'views/main.html',
       controller: 'MainController'
     })
     .when('/article-list', {
       templateUrl: 'views/article_list.html',
       controller: 'ArticleListController'
     })
     .when('/login', {
       templateUrl: 'views/login.html',
       controller: 'LoginController'
     })
     .otherwise({
       redirectTo: '/'
     });
 }])
 // Intercept any 401 responses 
 .config(['$httpProvider', function($httpProvider) {
   var interceptor = ['$rootScope', '$location', '$q',
   function($scope, $location, $q) {
     var success = function(resp) { return resp; },
         err = function(resp) {
           if (resp.status === 401) {
             var d = $q.defer();
             $scope.$broadcast('event:unauthorized');
             return d.promise;
           }
           return $q.reject(resp);
         };

     return function(promise) {
       return promise.then(success, err);
     };
   }];
   // http://stackoverflow.com/questions/23804981/alternative-of-httpprovider-responseinterceptors
   //$httpProvider.responseInterceptors.push(interceptor);
 }])
 .run(['$rootScope', '$http', '$location', 'tokenHandler', function($rootScope, $http, $location, tokenHandler) {
   $rootScope.$on('event:unauthorized', function() {
 		tokenHandler.set({});

     $location.path('/login');
   });
 }]);