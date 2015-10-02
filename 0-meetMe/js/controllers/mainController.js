
function DialogController($scope, $mdDialog,currentUserPopUP) {
  // console.log(currentUserPopUP);
  $scope.popUpDialogUser = currentUserPopUP
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

// ========================================================================== APPCTRL =============================================================================================================================
app.controller('AppCtrl', ['$scope', '$mdSidenav','userService','$routeParams','$mdMedia','$mdDialog','$mdToast', function($scope, $mdSidenav,userService,$routeParams,$mdMedia,$mdDialog,$mdToast){
    $scope.cardColumn = "2"



$scope.openToast = function( message) {
    $mdToast.show($mdToast.simple().content(message).position("bottom right"));
    // Could also do $mdToast.showSimple('Hello');
  };
//----------------------------------------------------------------------- APPCTRL   $mdDialog and $mdMedia 1111-------------------------------------------------------------------------------------------------------------------
  $scope.selectUserProfile = function  (user) {
    $scope.currentUserProfile = user
    // console.log(user);  
  }

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

  $scope.showAdvanced = function(ev,index) {
      $scope.popUpDialogUser = index
      // console.log($scope.popUpDialogUser);
      // console.log($scope.popUpDialogUser);
      $mdDialog.show({

        locals: {currentUserPopUP: $scope.popUpDialogUser},
        controller: DialogController,
        templateUrl: '/views/profilePreview.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
      // console.log('popopWorkded', index.name.first);
  };

  $scope.$watch(function() { return $mdMedia('gt-lg'); }, function(sizeBool) {
    $scope.biScreen = sizeBool;
    // console.log("big");
  });
   $scope.$watch(function() { return $mdMedia('sm'); }, function(sizeBool) {
    $scope.mediumScreen = sizeBool;
    // console.log("sm");
  });
   $scope.$watch(function() { return $mdMedia('md'); }, function(sizeBool) {
    $scope.smallScreen = sizeBool;
    // console.log('md');
  });

//----------------------------------------------------------------------- APPCTRL  Leaf Let Maps 2222 -------------------------------------------------------------------------------------------------------------------
  var geodataToMarkers = function(geodata) {
    var places = geodata.query.geosearch;
    var markers = [];
    for(var i=0; i<places.length; i++) {
      place = {
        lat: places[i].lat,
        lng: places[i].lon,
        message: getMessage(places[i].title)
      }
      markers.push(place);
    }

    return markers;
  }

  var userLocToMarkers = function  (usersGeoData) {
    var markers = []
    for (var i = 0; i < usersGeoData.length; i++) {
      place = {
        lat: usersGeoData[i].lat,
        lng: usersGeoData[i].lonn,
        message: getMessage(usersGeoData[i])
      }
      markers.push(place);
    };
    return markers;
  }

  $scope.setMapCenter = function  (user) {
    // console.log(user);
    $scope.showMap= true;
    $scope.cardColumn =  "3"

    $scope.mapCenter = {
      lat: user.lat,
      lng: user.lonn,
      zoom: 20
    };
  }
  $scope.toggleMap = function  (user) {
    $scope.showMap= !$scope.showMap;
    $scope.cardColumn = ($scope.cardColumn ==="2")? "3" : "2";
    // $scope.setMapCenter(user)
  }

  var getMessage = function(user) {
    // var h1 = "<p ng-click='toggleMap()" +"'>hello</p>"
    var url = "http://en.wikipedia.org/wiki/" + user.place;
    // $scope.openToast(user.pageid)

    var ptag = "<p><a target='_blank'  href='" + url + "'>" + user.place + "</a></p>"

    var profileUrl = "#ProfileView/{{$index}}" ;                                 
    return   "<h5><a target='_blank'  href='" + profileUrl + "'>" + user.name.first.toUpperCase() + "</a></h5>"+ ptag+"<img src="+user.picture.thumbnail +">";
  }
  $scope.mapCenter = {
    lat: 40.0164106,
    lng: -105.2201631,
    zoom: 12
  };
  
//----------------------------------------------------------------------- APPCTRL  content-------------------------------------------------------------------------------------------------------------------
  $scope.layout = 'row'

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };


//----------------------------------------------------------------------- APPCTRL  get users and calculate their locatoin from me-------------------------------------------------------------------------------------------------------------------
  $scope.users = userService.randomUsers
  $scope.user = userService.randomUsers[$routeParams.id]
  $scope.boulder = userService.boulder 
  
  for (var i = 0; i < $scope.users.length; i++) { // give each user random cordinates and location title 
    var randomNUm = Math.floor(Math.random() * $scope.boulder.length)
    $scope.users[i].lat = $scope.boulder[randomNUm].lat
    $scope.users[i].lonn = $scope.boulder[randomNUm].lon
    $scope.users[i].apart = 0
    $scope.users[i].place = $scope.boulder[randomNUm].title
    $scope.users[i].placeid = $scope.boulder[randomNUm].pageid
     $scope.mapMarkerss = userLocToMarkers($scope.users) // push into markers
    // console.log($scope.users[i].name.first, $scope.users[i].lat, $scope.users[i].lon);
  };


  if (typeof(Number.prototype.toRad) === "undefined") { // convert degres to radian
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
  }
  var lat2 = 25.6667   // Monterrey , Mexico 
  var lon2 = -100.3000 // Monterrey = boulder actual distance = 1030 miles
  var mylat = 0
  var mylon = 0

  function distanceFrom (atitude , ong) { // Central Subtended Angle Method || Great Circle Method
    var R = 6371 / 1.609344; //Earth Median radius in Kilometers / convert to km to miles
    var φ1 = mylat.toRad();
    var φ2 = atitude.toRad();
    var Δφ = (atitude-mylat).toRad();
    var Δλ = (ong-mylon).toRad();
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + // arc length
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distance = (R * c) ;
    return distance
  }
  // window.onload = function() { // get my location and set mylat mylon && $scope.lat $scope.longg
    var startPos;
    // get ip location
    navigator.geolocation.getCurrentPosition(function(position) {
      startPos = position;
      $scope.$apply(function(){

      $scope.lat = startPos.coords.latitude;
      $scope.longg = startPos.coords.longitude;
      }) 
      mylat = $scope.lat 
      mylon = $scope.longg 
      // console.log('My Coordinates are: \n Lat: ', mylat,"\n Lon: ",  mylon);
      distanceFrom(lat2,lon2)
      // console.log("I am " , distanceFrom(lat2,lon2), "miles from Monterrey, Mexico");
      for (var i = 0; i < $scope.users.length; i++) {
        
        $scope.$apply(function(){
        // console.log( distanceFrom($scope.users[i].lat,$scope.users[i].lonn) );
          $scope.users[i].apart = distanceFrom($scope.users[i].lat,$scope.users[i].lonn)

        }) 
      };
          $scope.users.sort(function(a, b) {
            return a.apart - b.apart;
          });
          $scope.newUsers = []
          for (var i = 0; i < $scope.users.length; i++) {
            $scope.newUsers.push({i :$scope.users[i]}) 
          };
          // console.log($scope.newUsers);

          $scope.openToast("Acquired Location! Lat: " + $scope.lat + " Lon: " + $scope.longg)
    });   
  // };

}]);


// ========================================================================== ModalInstanceCtrl =============================================================================================================================

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

// ========================================================================== ModalDemoCtrl =============================================================================================================================

app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});


// LEARN TO USE


  // navigator.geolocation.watchPosition(function(position) {
  //   $scope.lat = position.coords.latitude;
  //   $scope.longg = position.coords.longitude;
  // }); 