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
	};
	
	var failureForListOfBlogs = function() {
		console.log('Failed to get list of blogs');
	};
	
	// Find the first blog and we'll show the articles for that
	BlogService.listOfBlogs(successForListOfBlogs, failureForListOfBlogs);	
}]);