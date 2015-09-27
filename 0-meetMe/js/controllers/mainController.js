app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  // convert degres to radian
  if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}
// Central Subtended Angle Method
// Great Circle Method
// toronto
 var lat2 = 43.677
 var lon2 = -79.630
// johanasBurg
  var lat1 = -26.133;
  var lon1 = 28.242;
	// window.onload = function() {
	//   $scope.startPos;

	//   navigator.geolocation.getCurrentPosition(function(position) {
	//  $scope.startPos = position;

 //    var lat1 = $scope.startPos.coords.latitude;
	//   var lon1 = $scope.startPos.coords.longitude;
 //    $scope.lat = lat1
 //    $scope.longg = lon1
	//   });
	// };

  var R = 6371 / 1.609344; //Earth Median radius in Kilometres / convert to km to miles
  var φ1 = lat1.toRad();
  var φ2 = lat2.toRad();
  var Δφ = (lat2-lat1).toRad();
  var Δλ = (lon2-lon1).toRad();

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var distance = (R * c) ;
  console.log(distance);


  $scope.layout = 'row'
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  $scope.imagePath = 'https://material.angularjs.org/latest/img/washedout.png';
 $scope.names=['Igor Minar', 'Brad Green', 'Dave Geddes', 'Naomi Black', 'Greg Weber', 'Dean Sofer', 'Wes Alvaro', 'John Scott', 'Daniel Nadasi'];

	// navigator.geolocation.watchPosition(function(position) {
	//   document.getElementById('currentLat').innerHTML = position.coords.latitude;
	//   document.getElementById('currentLon').innerHTML = position.coords.longitude;
	// }); 
}]);

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