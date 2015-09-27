app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
//--------------------------------------------------------Material desing content--------------------------------------------------------------
  $scope.layout = 'row'
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  $scope.imagePath = 'https://material.angularjs.org/latest/img/washedout.png';
  $scope.names=['Igor Minar', 'Brad Green', 'Dave Geddes', 'Naomi Black', 'Greg Weber', 'Dean Sofer', 'Wes Alvaro', 'John Scott', 'Daniel Nadasi'];
//------------------------------------------------Location----------------------------------------------------------------------
  if (typeof(Number.prototype.toRad) === "undefined") { // convert degres to radian
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
  }
  var lat2 = 25.6667   // monterrey , mexico 
  var lon2 = -100.3000 // monterrey = boulder actual distaance = 1030 miles

  window.onload = function() { // get my location and set lat1 lon1 && $scope.lat $scope.longg
    var startPos;
    navigator.geolocation.getCurrentPosition(function(position) {
      startPos = position;
      $scope.lat = startPos.coords.latitude;
      $scope.longg = startPos.coords.longitude;
      lat1 = $scope.lat 
      lon1 = $scope.longg 
      console.log('My Coodinates are: \n Lat: ', lat1,"\n Lon: ",  lon1);
      distanceFrom()
    });   
  };
  // navigator.geolocation.watchPosition(function(position) {
  //   $scope.lat = position.coords.latitude;
  //   $scope.longg = position.coords.longitude;
  // }); 
  function distanceFrom (arg1 , arg2) { // Central Subtended Angle Method || Great Circle Method
    var R = 6371 / 1.609344; //Earth Median radius in Kilometres / convert to km to miles
    var φ1 = lat1.toRad();
    var φ2 = lat2.toRad();
    var Δφ = (lat2-lat1).toRad();
    var Δλ = (lon2-lon1).toRad();
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + // arc length
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distance = (R * c) ;
    console.log("I am " , Math.round(distance), "miles from Monterrey, Mexico");
  }


}]);



//----------------------------------------------------------------------------------------------------------------------

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