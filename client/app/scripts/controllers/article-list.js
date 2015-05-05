'use strict';

/**
 * @ngdoc function
 * @name remindersApp.controller:ArticleListController
 * @description
 * # ArticleListController
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('ArticleListController', ['$scope', 'BlogService', 'ArticleService',  function ($scope, BlogService, ArticleService) {
	
	$scope.articles = {};
	
	$scope.articles.articleSearchCriteria = '';
	$scope.articles.MODE_ARTICLE_LIST = 0;
	$scope.articles.MODE_ARTICLE_ADD = 1;
	
	$scope.articles.mode = $scope.articles.MODE_ARTICLE_LIST;
	
	$scope.chooseArticle = function(article_id) {
		for (var i = 0; i < $scope.articles.article_list.length; i++) {
			if ($scope.articles.article_list[i].id === article_id) {
				$scope.articles.chosenArticle = $scope.articles.article_list[i];
				ArticleService.listOfCommentsForAnArticle($scope.articles.chosenArticle, successForListOfComments, failureForListOfComments);
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
		
		ArticleService.listOfCommentsForAnArticle($scope.articles.chosenArticle, successForListOfComments, failureForListOfComments);
	};
	
	var successForListOfBlogs = function(blogs) {
		$scope.articles.listOfBlogs = blogs;
		$scope.articles.chosenBlog = blogs[0]; // For now, only one blog
		ArticleService.listOfArticlesForBlog($scope.articles.chosenBlog, successForListOfArticles, failureForListOfArticles);
	};
	
	var failureForListOfBlogs = function() {
		console.log('Failed to get list of blogs');
	};
	
	$scope.successForArticlePost = function(newArticle) {
		debugger;
	};
	
	$scope.failureForArticlePost = function() {
		console.log('Failed to post article');
	};
	
	$scope.subscribe = function() {
	  debugger;	
	};
	
	$scope.showNewArticleForm = function() {
		$scope.articles.mode = $scope.articles.MODE_ARTICLE_ADD;
		$scope.articles.newArticle = {};
	};
	
	$scope.addNewArticle = function() {
    $scope.articles.mode = $scope.articles.MODE_ARTICLE_LIST;

	  $scope.articles.newArticle.blog_id = $scope.articles.chosenBlog.id;
	  ArticleService.postArticle($scope.articles.article_list, $scope.articles.newArticle, $scope.successForArticlePost, $scope.failureForArticlePost);
	};
	
	$scope.cancelNewArticle = function() {
		$scope.articles.mode = $scope.articles.MODE_ARTICLE_LIST;
	};
	
	// Find the first blog and we'll show the articles for that
	BlogService.listOfBlogs(successForListOfBlogs, failureForListOfBlogs);	
}]);