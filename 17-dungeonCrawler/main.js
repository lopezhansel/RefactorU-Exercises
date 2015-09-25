// var World = function  (player,room,items,monters) {
// 	this.player = player
// 	this.room = room
// 	this.items = items
// 	this.monters = monters
// }
// var Player = function (inventory,strength){
// 	this.inventory = [];
// 	this.health = 100;
// }
// Player.prototype.examineItems = function() {
	
// };
// Player.prototype.pickUpItems = function() {
	
// };
// Player.prototype.consumeItem = function(first_argument) {
// };
// Player.prototype.dropItem = function(first_argument) {
// };
// Player.prototype.dropItem = function(first_argument) {
// };
 angular
     .module('blogs', ['xml'])
     .config(function ($httpProvider) {
       $httpProvider.responseInterceptors.push('xmlHttpInterceptor');
     })
     .controller('Blogs', function BlogsCtrl($scope, $http) {
       $scope.blogs = [];

       $http.get('blogs.xml').then(function (response) {
         var blogs = [],
             els = response.xml.find('blog'),
             blog,
             i;

         for (i = 0; i < els.length; i += 1) {
           blog = angular.element(els[i]);
           blogs.push({
             name: blog.attr('name'),
             id: blog.attr('id')
           });
         }

         $scope.blogs = blogs;
       });
     });
      function MyCtrl(xmlFilter) {
     var xml = xmlFilter('<blogs><blog name="my first blog" id="1"/></blogs>');
     console.log(xml.find('blog'));
     // => [blog#1]
   }
   function MyCtrl(xmlFilter) {
     var xml = xmlFilter('<blogs><blog name="my first blog" id="1"/></blogs>');
     console.log(xml.find('blog'));
     // => [blog#1]
   }