app.service('mainService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", function($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location) {
	var socket = io();
	var mainService = this;

	mainService.openToast = function(message,position) {
		var messagePosition = (position === undefined)? "top right" : position;
		$mdToast.show($mdToast.simple().content(message).position(messagePosition));
	};



	mainService.me = {};
	socket.on('apiMe', function(apiMe) {
		mainService.me = apiMe;
	});
	

	mainService.allRequests = [];
	socket.on('allRequests', function(data) { 
		// console.log("Sockets allRequests",data);

		mainService.openToast("New Request In", "top right");
		mainService.allRequests = data;
	});




	mainService.location = undefined;
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
		socket.emit("myLocation", myLocation);
	});


	socket.on('allUsers', function(data) { 
		mainService.openToast("New Users","bottom left");
		mainService.users = data;
		for (var prop2 in mainService.users) {
			mainService.users[prop2].apart = greatCircleMethod(mainService.users[prop2].lat, mainService.users[prop2].lon);
		}
	}); //socket.on('allUsers'  



}]);


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
