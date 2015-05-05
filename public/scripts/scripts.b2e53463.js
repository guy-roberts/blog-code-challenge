"use strict";angular.module("blogApp",["ngAnimate","ngCookies","ngRoute","ngSanitize","ngTouch","restangular"]).config(function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainController"}).when("/article-list",{templateUrl:"views/article_list.html",controller:"ArticleListController"}).when("/login",{templateUrl:"views/login.html",controller:"LoginController"}).otherwise({redirectTo:"/"})}),angular.module("blogApp").controller("MainController",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("blogApp").controller("ArticleListController",["$scope","BlogService","ArticleService",function(a,b,c){a.articles={},a.articles.article_search_criteria="",a.chooseArticle=function(b){for(var c=0;c<a.articles.article_list.length;c++)if(a.articles.article_list[c].id===b){a.articles.chosenArticle=a.articles.article_list[b];break}};var d=function(){console.log("Failed to get list of comments for an article")},e=function(b){a.articles.chosenComments=b},f=function(){console.log("Failed to get list of articles for a blog")},g=function(b){a.articles.article_list=b,a.articles.chosenArticle=b[0],c.listOfCommentsForAnArticle(a.articles.chosenArticle,e,d)},h=function(b){a.articles.listOfBlogs=b,c.listOfArticlesForBlog(b[0],g,f)},i=function(){console.log("Failed to get list of blogs")};b.listOfBlogs(h,i)}]),angular.module("grBlogFilters",[]),angular.module("blogApp").service("ArticleService",["Restangular",function(a){a.setRequestSuffix(".json"),a.setBaseUrl("/api/v1"),this.listOfArticlesForBlog=function(a,b,c){var d=a.getList("articles");return d.then(b,c),d},this.listOfCommentsForAnArticle=function(a,b,c){var d=a.getList("comments");return d.then(b,c),d}}]),angular.module("blogApp").service("BlogService",["Restangular",function(a){a.setRequestSuffix(".json"),a.setBaseUrl("/api/v1"),this.listOfBlogs=function(b,c){var d=a.all("blogs").getList();return d.then(b,c),d}}]);