app.service('userService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", function($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location) {
	var userService = this;
	var startPos;
	userService.location = undefined;
	userService.allRequests = [];
	var socket = io();

	userService.openToast = function(message,position) {
		var input = (position ===undefined)? "top right" : position;
		$mdToast.show($mdToast.simple().content(message).position(input));
	};


	// (function(cb) {
	// 	$http.get('http://ipv4.myexternalip.com/json').then(function(result) {
	// 		// this.ip = result.data.ip;
	// 		return $http.get("http://freegeoip.net/json/" + result.data.ip).then(function(res) {
	// 			// This is to center map on user location based on their Ip
	// 			cb({
	// 				lat: res.data.latitude,
	// 				lng: res.data.longitude,
	// 				zoom: 10
	// 			});
	// 		}); ////$http.get("http://freegeoip
	// 	}, function(e) {
	// 		console.log("couldn't get Ip Address", e);
	// 	});
	// })(function(returnData) {
	// 	userService.location = returnData;
	// 	userService.openToast("Semi Location Updated", "bottom right");
	// 	console.log("userService.location",userService.location);
	// });

	userService.me = {};
	socket.on('apiMe', function(data) {
		// userService.openToast(data,'top left');
		console.log("userService.me from Apime",data);
		userService.me = data;
		// userService.me = (data.name !== undefined) ? data.name.capitalizeFirstLetter() : "No Name";

	});
	socket.on('allRequests', function(data) { 
		console.log("Sockets allRequests",data);
		userService.allRequests = data;
	});

	navigator.geolocation.watchPosition(function(showPosition) {
		userService.openToast("Full Location Updated", " right");
		userService.location = {
			lat: showPosition.coords.latitude,
			lng: showPosition.coords.longitude,
			zoom: 10
		};
		myLocation = {
			accuracy: showPosition.coords.accuracy,
			lat: showPosition.coords.latitude,
			lon: showPosition.coords.longitude,
			timeStamp: Date.now(),
		};
		console.log("socket emit watchPosition to  Server ",myLocation);
		socket.emit("myLocation", myLocation);
	});



	socket.on('allUsers', function(data) { 
		// userService.openToast(data,"bottom left");
		userService.users = data;
		for (var prop2 in userService.users) {
			userService.users[prop2].apart = greatCircleMethod(userService.users[prop2].lat, userService.users[prop2].lon);
		}
		
		console.log(userService.users);
		userService.isUsersEmpty = Object.keys(userService.users).length;

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
// }); //socket.on('allUsers'   

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