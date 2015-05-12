'use strict';

/**
 * @ngdoc function
 * @name remindersApp.controller:ArticleListController
 * @description
 * # ArticleListController
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('ArticleListController', ['$scope', 'BlogService', 'ArticleService', 'SubscriptionService',  function ($scope, BlogService, ArticleService, SubscriptionService) {
	
	$scope.articles = {};
	
	$scope.articles.infoMessage = "Something happened";
	$scope.articles.showMessage = false;
	
	$scope.articles.articleSearchCriteria = '';
	$scope.articles.MODE_ARTICLE_LIST = 0;
	$scope.articles.MODE_ARTICLE_ADD = 1;
	$scope.articles.MODE_SUBSCRIBE = 2;
	
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
		// Refresh the list
		$scope.articles.article_list.push(newArticle);
		//$scope.articles.showMessage = false;
		
	};
	
	$scope.failureForArticlePost = function() {
		console.log('Failed to post article');
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
	
	$scope.showSubscriptionForm = function() {
	  $scope.articles.mode = $scope.articles.MODE_SUBSCRIBE;
	};

	$scope.cancelNewSubscription = function() {
	  $scope.articles.mode = $scope.articles.MODE_ARTICLE_LIST;
	  $scope.articles.subscription = {};
	};
	
	
	$scope.successForPostSubscription = function(newSubscription) {
		console.log('Success for post subscription');
	};
	$scope.failureForPostSubscription = function() {
		console.log('Failed to post a new subscription');
	};
	
	
	$scope.successForListOfSubscriptions = function(subscriptions) {
		$scope.articles.subscriptions = subscriptions;
		$scope.articles.subscription.blog_id = $scope.articles.chosenBlog.id;
		SubscriptionService.postSubscription(subscriptions, $scope.articles.subscription, $scope.successForPostSubscription, $scope.failureForPostSubscription);
	};
	$scope.failureForListOfSubscriptions = function() {
		console.log('Failed to get list of subscriptions');
	};
	
	$scope.addNewSubscription = function() {
	  $scope.articles.mode = $scope.articles.MODE_ARTICLE_LIST;
	  
	  SubscriptionService.listOfSubscriptions($scope.articles.chosenBlog, $scope.successForListOfSubscriptions, $scope.failureForListOfSubscriptions);
 	};
	
	// Find the first blog and we'll show the articles for that
	BlogService.listOfBlogs(successForListOfBlogs, failureForListOfBlogs);	
}]);