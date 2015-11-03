var clientLat = 0;
var clientLng = 0;

function greatCircleMethod(latitude, longitude) {
  var earthMedianRadius = (6371 / 1.609344); //Convert Kilometers to Miles 
  var φ1 = clientLat.toRad();
  var φ2 = latitude.toRad();
  var Δφ = (latitude - clientLat).toRad();
  var Δλ = (longitude - clientLng).toRad();
  var arc = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc));
  var distance = (earthMedianRadius * c);
  return distance;
}


function userLocToMarkers(inputUsers) {
  var markersArray = [];
  if (inputUsers.constructor === Object) {
    for (var oneUser in inputUsers) {
      // console.log(inputUsers[oneUser]);

      place = {
        lat: inputUsers[oneUser].lat,
        lng: inputUsers[oneUser].lon,
        message: getMessage(inputUsers[oneUser]),
        icon: {
          iconUrl: inputUsers[oneUser].icon || 'https://cdn4.iconfinder.com/data/icons/transportation-2-front-view/80/Transportation_front_view-06-512.png',
          iconSize: [45, 45],
        }
      }; //for (var oneUser in usersGeoDat
      markersArray.push(place);
    }
  } // if (inputUsers.constructor === Object

  if (inputUsers.constructor === Array) {
    for (var i = 0; i < inputUsers.length; i++) {
      place = {
        lat: inputUsers[i].lat,
        lng: inputUsers[i].lon,
        message: getMessage(inputUsers[i]),
        icon: {
          iconUrl: 'https://cdn4.iconfinder.com/data/icons/transportation-2-front-view/80/Transportation_front_view-06-512.png',
          iconSize: [45, 45],
        }
      };
      markersArray.push(place);
    }
  } // if (inputUsers.constructor === Array)
  return markersArray;
}

function getMessage(user) {
  // var h1 = "<p ng-click='toggleMap()" +"'>hello</p>"
  var url = "http://en.wikipedia.org/wiki/" + user.place;
  // $scope.openToast(user.pageid)
  var ptag = "<p><a target='_blank'  href='" + url + "'>" + user.timeStamp + "</a></p>";

  var profileUrl = "#ProfileView/" + user._id;
  // return "<h5><a target='_blank'  href='" + profileUrl + "'>" + user.firstName.toUpperCase() + "</a></h5>" + ptag + "<img src=" + user.pictureSm + ">";
  return "<h6><a target='_blank'  href='" + profileUrl + "'>" + user.username + "</a></h6>" + ptag + "<img src=" + user.pictureMd + ">";
}


var app = angular.module('StarterApp', ['ngAnimate', 'ngMaterial', 'ngRoute', 'ui.bootstrap', 'leaflet-directive']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('teal');
});

app.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function(a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if (reverse) filtered.reverse();
    return filtered;
  };
});


app.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      controller: 'mainController',
      templateUrl: 'views/homeView.html'
    })
    .when('/map', {
      controller: 'mapController',
      templateUrl: 'views/mapView.html'
    })
    .when('/accountSettings', {
      controller: 'accountController',
      templateUrl: 'views/accountSettingsView.html'
    })
    .when('/ProfileView/:id', {
      controller: 'mainController',
      templateUrl: 'views/ProfileView.html'
    })
    .when('/messages', {
      controller: 'messagesController',
      templateUrl: 'views/messagesView.html'
    })
    .when('/login', {
      controller: 'mainController',
      templateUrl: 'views/login.html'
    })
    .otherwise({
      redirectTo: '/home'
    });
});