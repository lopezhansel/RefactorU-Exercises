//     mongoimport --db taac --collection july2012 lariatData-sgeT-2012-07-02.json --jsonArray
//$ scp foobar.txt your_username@remotehost.edu:/some/remote/directory
// mongoexport --db test --collection traffic --out traffic.json
// ps -A | grep node 
// kill ####
//viiimvimkljl


// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
app.controller('AppCtrl', ['$scope', '$mdSidenav', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', function($scope, $mdSidenav, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData) {
  var startPos;
  var socket = io();
  $scope.users = {};
  $scope.isUsersEmpty = Object.keys($scope.users).length; 
  var myLocation = {};
  $scope.me = {};
  $scope.selectedIndex = 0;
  $scope.switchTabs = function  (leftOrRight) {
    $scope.selectedIndex = $scope.selectedIndex + leftOrRight;
    if ($scope.selectedIndex < 0) {$scope.selectedIndex = 0;}
  };
  

  console.log($scope.users);
  var json = 'http://ipv4.myexternalip.com/json';
  $http.get(json).then(function(result) {
    $scope.ip = result.data.ip;
    $http.get("http://freegeoip.net/json/" + result.data.ip).then(function(res) {
      // This is to center map on user location based on their Ip
      $scope.mapCenter = {
        lat: res.data.latitude,
        lng: res.data.longitude,
        zoom: 10
      };
    }); ////$http.get("http://freegeoip
  }, function(e) {
    console.log("couldn't get Ip Address" , e);
  });

  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000
  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000



  socket.on('apiMe', function(data) {
    $scope.me.name = data.capitalizeFirstLetter() || "NoName";
    $scope.$apply();
  });

  setInterval(function() {
    navigator.geolocation.getCurrentPosition(function(showPosition) {
      myLocation = {
        accuracy: showPosition.coords.accuracy,
        lat: showPosition.coords.latitude,
        lon: showPosition.coords.longitude,
        timeStamp: Date.now(),
      };
      socket.emit("myLocation", myLocation);
    }); //navigator.geolocation.getCurrentPosition
  }, 1000); //setInterval(function() {
  var count = 0;
  socket.on('allUsers', function(data) {
    $scope.users = data;
    $scope.isUsersEmpty = Object.keys($scope.users).length; 
    
    console.log(data);
    $scope.mapMarkerss = userLocToMarkers($scope.users); // push into markers  

    for (var prop2 in $scope.users) {
      $scope.$apply(function() {
        $scope.users[prop2].apart = greatCircleMethod($scope.users[prop2].lat, $scope.users[prop2].lon);
      });
    }
    if (count === 0) {
      count++;
      navigator.geolocation.getCurrentPosition(function(position) {
        startPos = position;
        $scope.$apply(function() {
          $scope.lat = startPos.coords.latitude;
          $scope.longg = startPos.coords.longitude;
        });
        clientLat = $scope.lat;
        clientLng = $scope.longg;
        for (var prop2 in $scope.users) {
          $scope.$apply(function() {
            $scope.users[prop2].apart = greatCircleMethod($scope.users[prop2].lat, $scope.users[prop2].lon);
            // console.log($scope.users[prop2].apart);
          });
        }

        $scope.openToast("Acquired Location! Lat: " + $scope.lat + " Lon: " + $scope.longg);
      }); // navigator.geolocation.getCurrentPosition
    } // if (count === 0) {
    $scope.$apply();
  }); //socket.on('allUsers'

  // socket.on('chatMessage', function(data) {
  //   console.log('chat message? ', data);
  //   $scope.messageHistory.push(data);
  //   $scope.$apply();
  // });
  // socket.on('whisper', function(data) {
  //   console.log(data.sender + ': ' + data.content);
  // });
  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000
  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000

  $scope.user = userService.randomUsers[$routeParams.id];

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
  // window.onload = function() { // get my location and set clientLat clientLng && $scope.lat $scope.longg



  function userLocToMarkers(inputUsers) {
    var markers = [];
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
        markers.push(place);
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
        markers.push(place);
      }
    } // if (inputUsers.constructor === Array)
    return markers;
  }



  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000
  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000

  $scope.showMap = false;
  $scope.setMapCenter = function(user) {
    $scope.selectedIndex = 1;

    $scope.gridflex = ($scope.xlg === false) ? "flex-50" : 'noflex';
    $scope.cardColumn = "3";
    leafletData.getMap().then(function(map) { 
      setTimeout(function() {
        map.invalidateSize(); // this fixes Map render Bug
      }, 200);
    }); ////leafletData.getMap().then(function(map) {
    if (typeof(user) === "object") { // set position clicking on a user
      // $scope.showMap = true;
      $scope.mapCenter = {
        lat: user.lat,
        lng: user.lon,
        zoom: 17,
      };
    } else { // other toggle 
      console.log("not user defined");
      $scope.showMap = !$scope.showMap;
      if ($scope.showMap && $scope.xlg) {
        $scope.gridflex = "noFlex";
      } else if ($scope.showMap && !$scope.xlg) {
        $scope.gridflex = "flex-50";
      }
      if (!$scope.showMap) {
        $scope.gridflex = "";
      }
    }

  };


  function getMessage(user) {
    // var h1 = "<p ng-click='toggleMap()" +"'>hello</p>"
    var url = "http://en.wikipedia.org/wiki/" + user.place;
    // $scope.openToast(user.pageid)
    var ptag = "<p><a target='_blank'  href='" + url + "'>" + user.timeStamp + "</a></p>";

    var profileUrl = "#ProfileView/" + user._id;
    // return "<h5><a target='_blank'  href='" + profileUrl + "'>" + user.firstName.toUpperCase() + "</a></h5>" + ptag + "<img src=" + user.pictureSm + ">";
    return "<h6><a target='_blank'  href='" + profileUrl + "'>" + user.username + "</a></h6>" + ptag + "<img src=" + user.pictureSm + ">";
  }
  $scope.mapCenter = {
    lat: 40.0164106,
    lng: -105.2201631,
    zoom: 12
  };

  // #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF
  // #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF

  $scope.cardColumn = "2";
  $scope.gridflex = "";

  $scope.openToast = function(message) {
    $mdToast.show($mdToast.simple().content(message).position("top right"));
    // Could also do $mdToast.showSimple('Hello');
  };

  $scope.selectUserProfile = function(user) {
    $scope.currentUserProfile = user;
    // console.log(user);  
  };

  $scope.status = '  ';
  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('This is an alert title')
      .content('You can specify some description text in here.')
      .ariaLabel('Alert Dialog Demo')
      .ok('Got it!')
      .targetEvent(ev)
    );
  };
  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete your debt?')
      .content('All of the banks have agreed to <span class="debt-be-gone">forgive</span> you your debts.')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Please do it!')
      .cancel('Sounds like a scam');
    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };

  $scope.showAdvanced = function(ev, index) {
    $scope.popUpDialogUser = index;
    // console.log($scope.popUpDialogUser);
    // console.log($scope.popUpDialogUser);
    $mdDialog.show({

        locals: {
          currentUserPopUP: $scope.popUpDialogUser
        },
        controller: DialogController,
        templateUrl: '/views/profilePreview.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });

    // console.log('popopWorkded', index.name.first);
  };

  $scope.$watch(function() {
    return $mdMedia('sm');
  }, function(sizeBool) {
    $scope.sm = sizeBool;
    // $scope.gridflex = ($scope.showMap && $scope.sm)? "flex-50" : 'closed'
    // console.log("sm", $scope.sm, "| Grid-flex", $scope.gridflex);
  });

  $scope.$watch(function() {
    return $mdMedia('md');
  }, function(sizeBool) {
    $scope.md = sizeBool;
    // $scope.gridflex = ($scope.showMap && $scope.md)? "flex-50" : 'closed'
    // console.log("md", $scope.md, "| Grid-flex", $scope.gridflex);
  });

  $scope.$watch(function() {
    return $mdMedia('lg');
  }, function(sizeBool) {
    $scope.lg = sizeBool;
    // $scope.gridflex = ($scope.showMap && $scope.lg)? "flex-50" : 'closed'
    // console.log("lg", $scope.lg, "| Grid-flex", $scope.gridflex);
  });


  $scope.$watch(function() {
    return $mdMedia('gt-lg');
  }, function(sizeBool) {
    $scope.xlg = sizeBool;
    if ($scope.showMap && $scope.xlg) {
      $scope.gridflex = "noflex";
    }
    if ($scope.showMap && !$scope.xlg) {
      $scope.gridflex = "flex-50";
      // console.log('not xlg yes map');
    }
    // console.log("gt-lg", $scope.xlg, "| Grid-flex", $scope.gridflex);
  });


  $scope.layout = 'row';

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  // #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF
  // #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF  #00E4FF


}]);

// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00


function DialogController($scope, $mdDialog, currentUserPopUP) {
  // console.log(currentUserPopUP);
  $scope.popUpDialogUser = currentUserPopUP;
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00