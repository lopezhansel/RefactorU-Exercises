

var app = angular.module('myApp', [])
app.controller('MainController', ['$scope', '$timeout', function($scope, $timeout){

	$scope.userFavLibs	=	"angular.js , React.js, Node.js, Express.js, Meteor.js"
	$scope.userName		=	"hansel whatever"
	$scope.userTwitter	=	"@bjDollaBills"
	$scope.userWork		=	"Developer"
	$scope.userEdu 		=	"RefactorU"
	$scope.userLocation =	"Boulder, CO"
	$scope.userBio  	=	" "

	$scope.formShow		= false;
	$scope.formToggle	= function  () {
		$scope.formShow = !$scope.formShow
	}
	

}])


