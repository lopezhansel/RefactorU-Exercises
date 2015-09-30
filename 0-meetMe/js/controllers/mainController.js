// ========================================================================== APPCTRL ===============================
app.controller('AppCtrl', ['$scope', '$mdSidenav','userService','$routeParams', function($scope, $mdSidenav,userService,$routeParams){
//------------------------------------------Material desing content--------------------------------------------------------------
  $scope.user = userService.randomUsers[$routeParams.id]
  $scope.users = userService.randomUsers
  $scope.denver = userService.boulder 
  
  for (var i = 0; i < $scope.users.length; i++) {
    var randomNUm = Math.floor(Math.random() * $scope.denver.length)
    $scope.users[i].lat = $scope.denver[randomNUm].lat
    $scope.users[i].lonn = $scope.denver[randomNUm].lon
    $scope.users[i].place = $scope.denver[randomNUm].title
    $scope.users[i].placeid = $scope.denver[randomNUm].pageid
    // console.log($scope.users[i].name.first, $scope.users[i].lat, $scope.users[i].lon);
  };
  for (var i = 0; i < $scope.users.length; i++) {
    $scope.users[i].name.first
  };
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
  var mylat = 0
  var mylon = 0
  // navigator.geolocation.watchPosition(function(position) {
  //   $scope.lat = position.coords.latitude;
  //   $scope.longg = position.coords.longitude;
  // }); 
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
  window.onload = function() { // get my location and set mylat mylon && $scope.lat $scope.longg
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
      console.log('My Coordinates are: \n Lat: ', mylat,"\n Lon: ",  mylon);
      distanceFrom(lat2,lon2)
      console.log("I am " , distanceFrom(lat2,lon2), "miles from Monterrey, Mexico");
      for (var i = 0; i < $scope.users.length; i++) {
        
        $scope.$apply(function(){
        console.log( distanceFrom($scope.users[i].lat,$scope.users[i].lonn) );
          $scope.users[i].apart = distanceFrom($scope.users[i].lat,$scope.users[i].lonn)

        }) 
      };

    });   
  };

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