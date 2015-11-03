app.service('userService', ['$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", function($routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location) {
	var userService = this;
	userService.openToast = function(message) {
	  $mdToast.show($mdToast.simple().content(message).position("top right"));
	  // Could also do $mdToast.showSimple('Hello');
	};
	userService.openToast('userService Loaded');
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
		userService.openToast('acquired location');
	});

	userService.me= {};
	socket.on('apiMe', function(data) {
		userService.me.name = data.capitalizeFirstLetter() || "NoName";
	});

	
  $interval(function() {
    navigator.geolocation.getCurrentPosition(function(showPosition) {
      myLocation = {
        accuracy: showPosition.coords.accuracy,
        lat: showPosition.coords.latitude,
        lon: showPosition.coords.longitude,
        timeStamp: Date.now(),
      };
      socket.emit("myLocation", myLocation); /// only emit of moved 10Feet   // #00FF24 #24FF00
    }); //navigator.geolocation.getCurrentPosition
  }, 2000); //setInterval(function() {




}]);








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