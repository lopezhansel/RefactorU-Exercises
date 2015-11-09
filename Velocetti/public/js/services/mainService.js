app.service('mainService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", function($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location) {
	var mainService = this;
	var startPos;
	mainService.location = undefined;
	mainService.allRequests = [];
	var socket = io();

	mainService.openToast = function(message,position) {
		var input = (position ===undefined)? "top right" : position;
		$mdToast.show($mdToast.simple().content(message).position(input));
	};

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
	})(function(returnObj) {
		if (mainService.location === undefined){
			mainService.location = returnObj;
			mainService.openToast("Semi Location Updated", "bottom right");
			clientLat = returnObj.lat;
			clientLng = returnObj.lng;
			for (var prop2 in mainService.users) {
				mainService.users[prop2].apart = greatCircleMethod(mainService.users[prop2].lat, mainService.users[prop2].lon);
			}
		}
	});

	mainService.me = {};

	socket.on('apiMe', function(data) {
		// mainService.openToast(data,'top left');
		// console.log("mainService.me from Apime",data);
		mainService.me = data;
		// mainService.me = (data.name !== undefined) ? data.name.capitalizeFirstLetter() : "No Name";
	});

	socket.on('allRequests', function(data) { 
		console.log("Sockets allRequests",data);
		mainService.allRequests = data;
	});

	navigator.geolocation.watchPosition(function(currentPosition) {
		mainService.openToast("Full Location Updated", "bottom right");
		clientLat = currentPosition.coords.latitude;
		clientLng = currentPosition.coords.longitude;

		mainService.location = {
			lat: currentPosition.coords.latitude,
			lng: currentPosition.coords.longitude,
			zoom: 10
		};
		myLocation = {
			accuracy: currentPosition.coords.accuracy,
			lat: currentPosition.coords.latitude,
			lon: currentPosition.coords.longitude,
			timeStamp: Date.now(),
		};
		// console.log("socket emit watchPosition to  Server ",myLocation);
		socket.emit("myLocation", myLocation);
	});



	socket.on('allUsers', function(data) { 
		mainService.openToast("New Users","bottom left");
		mainService.users = data;
		for (var prop2 in mainService.users) {
			mainService.users[prop2].apart = greatCircleMethod(mainService.users[prop2].lat, mainService.users[prop2].lon);
		}
		
		// console.log(mainService.users);
		// mainService.isUsersEmpty = Object.keys(mainService.users).length;

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
// var mainService = this;
// getLocation(function (data) {
// 	console.log(data);
// 	mainService.location = data;
// });
//////////////////////////////////////////////////////////