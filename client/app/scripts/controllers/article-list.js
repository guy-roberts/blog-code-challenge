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
	$scope.articles.article_search_criteria = "";
	
	$scope.chooseArticle = function(article_id) {
		for (var i = 0; i < $scope.articles.article_list.length; i++) {
			if ($scope.articles.article_list[i].id === article_id) {
				
				$scope.articles.chosenArticle = $scope.articles.article_list[article_id];
			  break;	
			}
		}
		
	};
	
	var failureForListOfComments = function() {
		console.log('Failed to get list of comments for an article');
	};
	
	var successForListOfComments = function(comments) {
		$scope.articles.chosenComments = comments;		
	};
		
	var failureForListOfArticles = function() {
		console.log('Failed to get list of articles for a blog');
	};
	
	var successForListOfArticles = function(articles) {
		$scope.articles.article_list = articles;
		$scope.articles.chosenArticle = articles[0];
		
		ArticleService.listOfCommentsForAnArticle($scope.articles.chosenArticle, successForListOfComments, failureForListOfComments)
	};
	
	var successForListOfBlogs = function(blogs) {
		$scope.articles.listOfBlogs = blogs;
		ArticleService.listOfArticlesForBlog(blogs[0], successForListOfArticles, failureForListOfArticles)
	};
	
	var failureForListOfBlogs = function() {
		console.log('Failed to get list of blogs');
	};
	
	// Find the first blog and we'll show the articles for that
	BlogService.listOfBlogs(successForListOfBlogs, failureForListOfBlogs);	
}]);