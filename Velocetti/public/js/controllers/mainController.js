app.controller('mainController', ['$scope', 'mainService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", "$timeout", function($scope, mainService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location, $timeout) {
  $timeout(function  () {
    if (mainService.me === "there"){ $location.path("/login");} 
  },200);

  var count = 0;
  $scope.users = null;

  var myLocation = {};

  $scope.me = mainService.me;
  $timeout(function() {
    $scope.users = mainService.users;
  }, 50);
  
  $interval(function() {
    $scope.users = mainService.users;
  }, 1000);


  $scope.showMap = false;
  $scope.selectedUser = {};
  $scope.setMapCenter = function(user) {
    $scope.selectedUser = user;
    mainService.location = {
        lat: user.lat,
        lng: user.lon,
        zoom: 17,
      };
    console.log($scope.selectedUser);
    $scope.selectedIndex = 1;
    $location.path('/map');
  };

  $scope.cardColumn = "2";
  $scope.gridflex = "";


  $scope.status = '  ';
  $scope.showLoginDialog = function(ev, index) {
    $scope.popUpDialogUser = index;
    $mdDialog.show({
        locals: {
          currentUserPopUP: $scope.popUpDialogUser
        },
        controller: loginDialogController,
        templateUrl: '/views/loginDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });

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

}]);


function loginDialogController($scope, $mdDialog, $http,mainService) {
  // console.log(currentUserPopUP);
  // $scope.popUpDialogUser = currentUserPopUP;
  $scope.loginForm = {};
  $scope.signupForm = {};
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
  
  $scope.loginAsGuest = function() {
    $scope.guest = {
      username : "smallmouse892",
      password : "tunafish"
    };
    $http({
      method: 'POST',
      url: '/login',
      data: $scope.guest
    }).then(function(returnData) {
      console.log(returnData);
      if (returnData.data) {
        window.location.href = "/";
      } else {
        console.log(returnData);
      }
    } );
    $mdDialog.hide();
  };
  $scope.signup = function(argument) {
    $http({
      method: 'POST',
      url: '/signup',
      data: $scope.signupForm
    }).then(function(returnData) {
      console.log(returnData);
      if (returnData.data) {
        window.location.href = "/";
      } else {
        console.log(returnData);
      }
    });
    $mdDialog.hide();
  };
  $scope.chuck = function  () {
    console.log("running");
    $scope.signupForm.pictureMd = 'http://www.fightersonlymag.com/images/chucknorris.jpg';
  };
  $scope.hansel = function  () {
    console.log("running");
    $scope.signupForm.pictureMd = 'https://avatars1.githubusercontent.com/u/11531054?v=3&s=400';
  };
  $scope.login = function(argument) {
    console.log($scope.loginForm);
    $http({
      method: 'POST',
      url: '/login',
      data: $scope.loginForm
    }).then(function(returnData) {
      console.log(returnData);
      if (returnData.data) {
        window.location.href = "/";
      } else {
        console.log(returnData);
      }
    });

    $mdDialog.hide();
  };
}
