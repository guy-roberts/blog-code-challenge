'use strict';

/**
 * @ngdoc function
 * @name remindersApp.controller:CommentsController
 * @description
 * # CommentsController
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('CommentsController', ['$scope', 'ArticleService', 'CommentService',  function ($scope, ArticleService, CommentService) {
	
	$scope.articles.show_comment_input = false;
	$scope.articles.newComment = {};
		
  $scope.newComment = function(article_id) {
	  $scope.articles.newComment = {};
		$scope.articles.show_comment_input = true;
  };

  $scope.successForPost = function(newComment) {
		$scope.articles.show_comment_input = false;
		$scope.articles.newComment = {};
		
		// Instead of updating the list of comments from the server, push the new one onto the list
		$scope.articles.chosenComments.push(newComment);
  };

  $scope.failureForPost = function() {
		$scope.articles.show_comment_input = false;	
		$scope.articles.newComment = {};
	
	  console.log('Failed to post new comment');
  };

  $scope.addNewComment = function() {	
	  $scope.articles.newComment.article_id = $scope.articles.chosenArticle.id;
	  CommentService.postComment($scope.articles.chosenComments, $scope.articles.newComment, $scope.successForPost, $scope.failureForPost);	    
  };

  $scope.cancelNewComment = function() {
		$scope.articles.show_comment_input = false;
		$scope.articles.newComment = {};
  };
	
}]);