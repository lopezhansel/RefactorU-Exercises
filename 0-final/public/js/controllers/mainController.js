// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
app.controller('AppCtrl', ['$scope', '$mdSidenav', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", function($scope, $mdSidenav, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http) {
  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000
  var socket = io();
  $scope.users = {};

  socket.on('loggedInUsers', function(data) {
    console.log(data);
    $scope.users = data;
    for (var i = 0; i < $scope.users.length; i++) {
      $scope.users[i].apart = 0;
      $scope.mapMarkerss = userLocToMarkers($scope.users); // push into markers
    }
    navigator.geolocation.getCurrentPosition(function(position) {
      startPos = position;
      $scope.$apply(function() {

        $scope.lat = startPos.coords.latitude;
        $scope.longg = startPos.coords.longitude;
      });
      mylat = $scope.lat;
      mylon = $scope.longg;
      // console.log('My Coordinates are: \n Lat: ', mylat,"\n Lon: ",  mylon);
      // greatCircleMethod(monterreyLat, monterreyLon);
      // console.log("I am " , greatCircleMethod(monterreyLat,monterreyLon), "miles from Monterrey, Mexico");
      for (var i = 0; i < $scope.users.length; i++) {
        $scope.$apply(function() {
          $scope.users[i].apart = greatCircleMethod($scope.users[i].lat, $scope.users[i].lon);
        });
      }
      $scope.users.sort(function(a, b) {
        return a.apart - b.apart;
      });
      $scope.newUsers = [];
      for (var i = 0; i < $scope.users.length; i++) {
        $scope.newUsers.push({
          i: $scope.users[i]
        });
      }
      // console.log($scope.newUsers);

      $scope.openToast("Acquired Location! Lat: " + $scope.lat + " Lon: " + $scope.longg);
    });
    $scope.$apply();
  });

  // socket.on('chatMessage', function(data) {
  //   console.log('chat message? ', data);
  //   $scope.messageHistory.push(data);
  //   $scope.$apply();
  // });
  // socket.on('whisper', function(data) {
  //   console.log(data.sender + ': ' + data.content);
  // });
  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000

  // $scope.users = userService.randomUsers;
  $scope.user = userService.randomUsers[$routeParams.id];
  // $scope.boulder = userService.boulder;



  // var monterreyLat = 25.6667; 
  // var monterreyLon = -100.3000; // Monterrey-Boulder 1030 miles
  var mylat = 0;
  var mylon = 0;

  function greatCircleMethod(latitude, longitude) {
    var earthMedianRadius = 6371 / 1.609344; //Convert Kilometers to Miles 
    var φ1 = mylat.toRad();
    var φ2 = latitude.toRad();
    var Δφ = (latitude - mylat).toRad();
    var Δλ = (longitude - mylon).toRad();
    var arc = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc));
    var distance = (earthMedianRadius * c);
    return distance;
  }
  // window.onload = function() { // get my location and set mylat mylon && $scope.lat $scope.longg
  var startPos;
  // get ip location
  // };
  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000
  var geodataToMarkers = function(geodata) {
    var places = geodata.query.geosearch;
    var markers = [];
    for (var i = 0; i < places.length; i++) {
      place = {
        lat: places[i].lat,
        lng: places[i].lon,
        message: getMessage(places[i].title)
      };

      markers.push(place);
    }

    return markers;
  };

  function userLocToMarkers(usersGeoData) {
    var markers = [];
    for (var i = 0; i < usersGeoData.length; i++) {
      place = {
        lat: usersGeoData[i].lat,
        lng: usersGeoData[i].lon,
        message: getMessage(usersGeoData[i])
      };
      markers.push(place);
    }
    return markers;
  }

  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000
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



  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000
  $scope.$watch(function() {
    return $mdMedia('sm');
  }, function(sizeBool) {
    $scope.sm = sizeBool;
    // $scope.gridflex = ($scope.showMap && $scope.sm)? "flex-50" : 'closed'
    console.log("sm", $scope.sm, "| Grid-flex", $scope.gridflex);
  });

  $scope.$watch(function() {
    return $mdMedia('md');
  }, function(sizeBool) {
    $scope.md = sizeBool;
    // $scope.gridflex = ($scope.showMap && $scope.md)? "flex-50" : 'closed'
    console.log("md", $scope.md, "| Grid-flex", $scope.gridflex);
  });

  $scope.$watch(function() {
    return $mdMedia('lg');
  }, function(sizeBool) {
    $scope.lg = sizeBool;
    // $scope.gridflex = ($scope.showMap && $scope.lg)? "flex-50" : 'closed'
    console.log("lg", $scope.lg, "| Grid-flex", $scope.gridflex);
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
      console.log('not xlg yes map');
    }
    console.log("gt-lg", $scope.xlg, "| Grid-flex", $scope.gridflex);
  });
  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000

  $scope.showMap = false;
  $scope.setMapCenter = function(user) {
    $scope.gridflex = ($scope.xlg === false) ? "flex-50" : 'noflex';
    $scope.cardColumn = "3";
    if (typeof(user) === "object") { // set position clicking on a user
      $scope.showMap = true;
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

    var ptag = "<p><a target='_blank'  href='" + url + "'>" + user.place + "</a></p>";

    var profileUrl = "#ProfileView/{{$index}}";
    return "<h5><a target='_blank'  href='" + profileUrl + "'>" + user.firstName.toUpperCase() + "</a></h5>" + ptag + "<img src=" + user.pictureSm + ">";
  }
  $scope.mapCenter = {
    lat: 40.0164106,
    lng: -105.2201631,
    zoom: 12
  };


  // #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000  #FF0000
  $scope.layout = 'row';

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };



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

app.controller('ModalInstanceCtrl', function($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00

app.controller('ModalDemoCtrl', function($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function(size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});


// LEARN TO USE


// navigator.geolocation.watchPosition(function(position) {
//   $scope.lat = position.coords.latitude;
//   $scope.longg = position.coords.longitude;
// });