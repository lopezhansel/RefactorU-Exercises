// ========================================================================== APPCTRL ===============================
app.controller('AppCtrl', ['$scope', '$mdSidenav','userService','$routeParams', function($scope, $mdSidenav,userService,$routeParams){
//------------------------------------------Material desing content--------------------------------------------------------------
  $scope.user = userService.randomUsers[$routeParams.id]
  $scope.users = userService.randomUsers
  $scope.layout = 'row'
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
//------------------------------------------------Location----------------------------------------------------------------------
  if (typeof(Number.prototype.toRad) === "undefined") { // convert degres to radian
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
  }
  var lat2 = 25.6667   // Monterrey , Mexico 
  var lon2 = -100.3000 // Monterrey = boulder actual distance = 1030 miles

  window.onload = function() { // get my location and set lat1 lon1 && $scope.lat $scope.longg
    var startPos;
    navigator.geolocation.getCurrentPosition(function(position) {
      startPos = position;
      $scope.lat = startPos.coords.latitude;
      $scope.longg = startPos.coords.longitude;
      lat1 = $scope.lat 
      lon1 = $scope.longg 
      // console.log('My Coordinates are: \n Lat: ', lat1,"\n Lon: ",  lon1);
      distanceFrom()
    });   
  };
  // navigator.geolocation.watchPosition(function(position) {
  //   $scope.lat = position.coords.latitude;
  //   $scope.longg = position.coords.longitude;
  // }); 
  function distanceFrom (arg1 , arg2) { // Central Subtended Angle Method || Great Circle Method
    var R = 6371 / 1.609344; //Earth Median radius in Kilometers / convert to km to miles
    var φ1 = lat1.toRad();
    var φ2 = lat2.toRad();
    var Δφ = (lat2-lat1).toRad();
    var Δλ = (lon2-lon1).toRad();
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + // arc length
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distance = (R * c) ;
    // console.log("I am " , Math.round(distance), "miles from Monterrey, Mexico");
  }

}]);



// ========================================================================== ModalInstanceCtrl =====================
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

// ========================================================================== ModalDemoCtrl =========================
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