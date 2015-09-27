app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  $scope.imagePath = 'https://material.angularjs.org/latest/img/washedout.png';
 $scope.names=['Igor Minar', 'Brad Green', 'Dave Geddes', 'Naomi Black', 'Greg Weber', 'Dean Sofer', 'Wes Alvaro', 'John Scott', 'Daniel Nadasi'];
	window.onload = function() {
	  var startPos;
	  navigator.geolocation.getCurrentPosition(function(position) {
	    startPos = position;
	    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
	    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
	    console.log('hello');
	  });
	};
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