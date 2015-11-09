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


var app = angular.module('StarterApp', ['ngAnimate', 'ngMaterial', 'ngRoute',  'leaflet-directive']);

//Velocity Colors #61CBE9 // #F5EAE2 // #F36F36
//http://mcg.mbitson.com/#/
//http://angular-md-color.com/#/
app.config(function($mdThemingProvider) {
  $mdThemingProvider.definePalette('myBlue', {
    '50': 'ffebee',
    '100': 'ffcdd2',
    '200': 'ef9a9a',
    '300': 'e57373',
    '400': 'ef5350',
    '500': 'f36f36',
    '600': 'e53935',
    '700': 'd32f2f',
    '800': 'c62828',
    '900': 'b71c1c',
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });
  $mdThemingProvider.theme('default')
    .primaryPalette('myBlue');
  });

app.config(function($mdThemingProvider) {
  $mdThemingProvider.definePalette('myOrange', {
    '50': 'ffebee',
    '100': 'ffcdd2',
    '200': 'ef9a9a',
    '300': 'e57373',
    '400': 'ef5350',
    '500': 'f36f36',
    '600': 'e53935',
    '700': 'd32f2f',
    '800': 'c62828',
    '900': 'b71c1c',
    'A100': 'ff8a80',
    'A200': '61CBE9',
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });
  $mdThemingProvider.theme('default')
    .accentPalette('myOrange');
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
    .when('/requests', {
      controller: 'requestsController',
      templateUrl: 'views/requestsView.html'
    })
    .when('/ProfileView/:id', {
      controller: 'mainController',
      templateUrl: 'views/ProfileView.html'
    })
    .when('/profile', {
      controller: 'profileController',
      templateUrl: 'views/profileView.html'
    })
    .when('/login', {
      controller: 'mainController',
      templateUrl: 'views/loginView.html'
    })
    .otherwise({
      redirectTo: '/home'
    });
});