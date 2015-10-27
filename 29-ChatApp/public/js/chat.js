var app = angular.module('app', []);
app.controller('mainController', ['$scope', '$http', function($scope, $http){

        $http({
            method : 'GET',
            url    : '/api/me',
        }).then(function(returnData){
            if ( returnData.data.user ) {
                $scope.user = returnData.data.user;
            }
        });
        var socket = io();

        socket.on('loggedInUsers', function  (data) {
            console.log('loggedInUsers' , data);
            $scope.loggedInUsers = data;
            $scope.$apply();

        });
        
    }]);
