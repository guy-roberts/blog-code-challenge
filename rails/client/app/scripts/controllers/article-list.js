'use strict';

/**
 * @ngdoc function
 * @name remindersApp.controller:ArticleListController
 * @description
 * # ArticleListCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('ArticleListController', ['$scope', 'BlogService', 'ArticleService',  function ($scope, BlogService, ArticleService) {
	
	$scope.articles = {};
	
	var successForListOfBlogs = function(blogs) {
		$scope.articles.listOfBlogs = blogs;
		debugger
	};
	
	var failureForListOfBlogs = function() {
		console.log('Failed to get list of blogs');
	};
	
	BlogService.listOfBlogs(successForListOfBlogs, failureForListOfBlogs);	
}]);