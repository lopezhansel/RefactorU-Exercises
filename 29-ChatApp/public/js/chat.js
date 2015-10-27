var app = angular.module('app', []);
app.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.chatMessage = '';
    $scope.loggedInUsers = [];
    $scope.messageHistory = [];

    $http({
        method: 'GET',
        url: '/api/me',
    }).then(function(returnData) {
        if (returnData.data.user) {
            $scope.user = returnData.data.user;
        }
    });
    var socket = io();

    socket.on('loggedInUsers', function(data) {
        console.log('loggedInUsers', data);
        $scope.loggedInUsers = data;
        $scope.$apply();

    });
    $scope.sendMessage = function(event) {
        socket.emit('chatMessage', $scope.chatMessage);

    };
}]);