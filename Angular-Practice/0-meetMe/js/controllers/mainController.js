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
// ========================================================================== APPCTRL =============================================================================================================================
app.controller('AppCtrl', ['$scope', '$mdSidenav', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', function($scope, $mdSidenav, userService, $routeParams, $mdMedia, $mdDialog, $mdToast) {
  $scope.cardColumn = "2";
  $scope.gridflex = "";

  $scope.openToast = function(message) {
    $mdToast.show($mdToast.simple().content(message).position("top right"));
    // Could also do $mdToast.showSimple('Hello');
  };
  //----------------------------------------------------------------------- APPCTRL   $mdDialog and $mdMedia 1111-------------------------------------------------------------------------------------------------------------------
  $scope.selectUserProfile = function(user) {
    $scope.currentUserProfile = user;
    // console.log(user);  
  };

  $scope.status = '  ';


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



  //----------------------------------------------------------------------- APPCTRL  Leaf Let Maps 2222 -------------------------------------------------------------------------------------------------------------------
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

  var userLocToMarkers = function(usersGeoData) {
    var markers = [];
    for (var i = 0; i < usersGeoData.length; i++) {
      place = {
        lat: usersGeoData[i].lat,
        lng: usersGeoData[i].lonn,
        message: getMessage(usersGeoData[i])
      };
      markers.push(place);
    }
    return markers;
  };

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

  $scope.showMap = false;
  $scope.setMapCenter = function(user) {
    $scope.gridflex = ($scope.xlg === false) ? "flex-50" : 'noflex';
    $scope.cardColumn = "3";
    if (typeof(user) === "object") { // set position clicking on a user
      $scope.showMap = true;
      $scope.mapCenter = {
        lat: user.lat,
        lng: user.lonn,
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


  var getMessage = function(user) {
    // var h1 = "<p ng-click='toggleMap()" +"'>hello</p>"
    var url = "http://en.wikipedia.org/wiki/" + user.place;
    // $scope.openToast(user.pageid)

    var ptag = "<p><a target='_blank'  href='" + url + "'>" + user.place + "</a></p>";

    var profileUrl = "#ProfileView/{{$index}}";
    return "<h5><a target='_blank'  href='" + profileUrl + "'>" + user.name.first.toUpperCase() + "</a></h5>" + ptag + "<img src=" + user.picture.thumbnail + ">";
  };
  $scope.mapCenter = {
    lat: 40.0164106,
    lng: -105.2201631,
    zoom: 12
  };

  //----------------------------------------------------------------------- APPCTRL  content-------------------------------------------------------------------------------------------------------------------
  $scope.layout = 'row';

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  console.log($routeParams);

  //----------------------------------------------------------------------- APPCTRL  get users and calculate their locatoin from me-------------------------------------------------------------------------------------------------------------------
  $scope.users = userService.randomUsers;
  $scope.user = userService.randomUsers[$routeParams.id];
  $scope.boulder = userService.boulder;
  for (var i = 0; i < $scope.users.length; i++) { // give each user random cordinates and location title 
    var randomNUm = Math.floor(Math.random() * $scope.boulder.length);
    $scope.users[i].lat = $scope.boulder[randomNUm].lat;
    $scope.users[i].lonn = $scope.boulder[randomNUm].lon;
    $scope.users[i].apart = 0;
    $scope.users[i].place = $scope.boulder[randomNUm].title;
    $scope.users[i].placeid = $scope.boulder[randomNUm].pageid;
    $scope.mapMarkerss = userLocToMarkers($scope.users); // push into markers
    // console.log($scope.users[i].name.first, $scope.users[i].lat, $scope.users[i].lon);
  }



  // window.onload = function() { // get my location and set mylat mylon && $scope.lat $scope.longg
  var startPos;
  // get ip location
  navigator.geolocation.getCurrentPosition(function(position) {
    startPos = position;
    $scope.$apply(function() {

      $scope.lat = startPos.coords.latitude;
      $scope.longg = startPos.coords.longitude;
    });
    mylat = $scope.lat;
    mylon = $scope.longg;
    // console.log('My Coordinates are: \n Lat: ', mylat,"\n Lon: ",  mylon);
    distanceFrom(lat2, lon2);
    // console.log("I am " , distanceFrom(lat2,lon2), "miles from Monterrey, Mexico");
    for (var i = 0; i < $scope.users.length; i++) {

      $scope.$apply(function() {
        // console.log( distanceFrom($scope.users[i].lat,$scope.users[i].lonn) );
        $scope.users[i].apart = distanceFrom($scope.users[i].lat, $scope.users[i].lonn);

      })
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

    $scope.openToast("Acquired Location! Lat: " + $scope.lat + " Lon: " + $scope.longg)
  });
  // };

}]);


// ========================================================================== ModalInstanceCtrl =============================================================================================================================

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

// ========================================================================== ModalDemoCtrl =============================================================================================================================

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