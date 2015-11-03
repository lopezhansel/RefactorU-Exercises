app.service('userService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", function($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location) {
	var userService = this;
	var startPos;

	userService.openToast = function(message) {
		$mdToast.show($mdToast.simple().content(message).position("top right"));
		// Could also do $mdToast.showSimple('Hello');
	};
	var socket = io();

	(function(cb) {
		$http.get('http://ipv4.myexternalip.com/json').then(function(result) {
			// this.ip = result.data.ip;
			return $http.get("http://freegeoip.net/json/" + result.data.ip).then(function(res) {
				// This is to center map on user location based on their Ip
				cb({
					lat: res.data.latitude,
					lng: res.data.longitude,
					zoom: 10
				});
			}); ////$http.get("http://freegeoip
		}, function(e) {
			console.log("couldn't get Ip Address", e);
		});
	})(function(returnData) {
		userService.location = returnData;
	});

	userService.me = {};
	socket.on('apiMe', function(data) {
		console.log(data);
		userService.me.name = (data !== null) ? data.capitalizeFirstLetter() : "No Name";

	});

	navigator.geolocation.watchPosition(function(showPosition) {
		userService.openToast(showPosition.coords.latitude);
		myLocation = {
			accuracy: showPosition.coords.accuracy,
			lat: showPosition.coords.latitude,
			lon: showPosition.coords.longitude,
			timeStamp: Date.now(),
		};
		console.log(myLocation);
		socket.emit("myLocation", myLocation);
	});



	socket.on('allUsers', function(data) { 
		userService.users = data;
		console.log(userService.users);
		userService.isUsersEmpty = Object.keys(userService.users).length;

		// for (var prop2 in $scope.users) {
		// 	$scope.users[prop2].apart = greatCircleMethod($scope.users[prop2].lat, $scope.users[prop2].lon);
		// }
		// if (count === 0) {
		// 	count++;
		// 	navigator.geolocation.getCurrentPosition(function(position) {
		// 		startPos = position;

		// 		$scope.lat = startPos.coords.latitude;
		// 		$scope.longg = startPos.coords.longitude;

		// 		$scope.$digest();
		// 		clientLat = $scope.lat;
		// 		clientLng = $scope.longg;

		// 		$scope.openToast("Acquired Location! Lat: " + $scope.lat + " Lon: " + $scope.longg);
		// 	}); // navigator.geolocation.getCurrentPosition
		// } // if (count === 0) {

	}); //socket.on('allUsers'  

}]);

//   for (var prop2 in $scope.users) {
//     $scope.users[prop2].apart = greatCircleMethod($scope.users[prop2].lat, $scope.users[prop2].lon);
//     // $scope.$apply(function() {
//     //   $scope.users[prop2].apart = greatCircleMethod($scope.users[prop2].lat, $scope.users[prop2].lon);
//     // });
//     $scope.$digest();
//   }
//   if (count === 0) {
//     count++;
//     navigator.geolocation.getCurrentPosition(function(position) {
//       startPos = position;
//       // $scope.$apply(function() {
//       $scope.lat = startPos.coords.latitude;
//       $scope.longg = startPos.coords.longitude;
//       // });
//       $scope.$digest();
//       clientLat = $scope.lat;
//       clientLng = $scope.longg;
//       // for (var prop2 in $scope.users) {
//       //   $scope.$apply(function() {
//       //     $scope.users[prop2].apart = greatCircleMethod($scope.users[prop2].lat, $scope.users[prop2].lon);
//       //     $scope.users[prop2].apart = greatCircleMethod($scope.users[prop2].lat, $scope.users[prop2].lon);
//       //     // console.log($scope.users[prop2].apart);
//       //   });
//       // }

//       $scope.openToast("Acquired Location! Lat: " + $scope.lat + " Lon: " + $scope.longg);
//     }); // navigator.geolocation.getCurrentPosition
//   } // if (count === 0) {
//   $scope.$digest();
// }); //socket.on('allUsers'   // #00FF24 #24FF00

///////////////////////////////////////////////////////////////////////////////
// this.location = {};
// function getLocation (cb) {
// 	$http.get('http://ipv4.myexternalip.com/json').then(function(result) {
// 		// this.ip = result.data.ip;
// 		return $http.get("http://freegeoip.net/json/" + result.data.ip).then(function(res) {
// 			// This is to center map on user location based on their Ip
// 			cb( {
// 				lat: res.data.latitude,
// 				lng: res.data.longitude,
// 				zoom: 10
// 			});
// 		}); ////$http.get("http://freegeoip
// 	}, function(e) {
// 		console.log("couldn't get Ip Address", e);
// 	});

// }
// var userService = this;
// getLocation(function (data) {
// 	console.log(data);
// 	userService.location = data;
// });
//////////////////////////////////////////////////////////