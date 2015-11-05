//     mongoimport --db taac --collection july2012 lariatData-sgeT-2012-07-02.json --jsonArray
// mongoimport --db velociti --collection users users.json
//$ scp foobar.txt your_username@remotehost.edu:/some/remote/directory
// mongoexport --db test --collection traffic --out traffic.json
// 
// ps -A | grep node 
// kill ####
// Angular Services are SingleTons


app.controller('mainController', ['$scope', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", "$timeout", function($scope, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location, $timeout) {
  $timeout(function  () {
    if (userService.me === "there"){ $location.path("/login");} 
  },200);

  var count = 0;
  $scope.users = null;
  // $scope.isUsersEmpty = Object.keys($scope.users).length;

  var myLocation = {};

  $scope.me = userService.me;
  $timeout(function() {
    $scope.users = userService.users;
  }, 50);
  
  $interval(function() {
    $scope.users = userService.users;
  }, 1000);
  // socket.on('chatMessage', function(data) {
  //   console.log('chat message? ', data);
  //   $scope.messageHistory.push(data);
  //   $scope.$apply();
  // });
  // socket.on('whisper', function(data) {   // #00FF24 #24FF00
  //   console.log(data.sender + ': ' + data.content);
  // });

  // $scope.user = userService.randomUsers[$routeParams.id];

  $scope.showMap = false;
  $scope.selectedUser = {};
  $scope.setMapCenter = function(user) {
    $scope.selectedUser = user;
    userService.location = {
        lat: user.lat,
        lng: user.lon,
        zoom: 17,
      };
    console.log($scope.selectedUser);
    $scope.selectedIndex = 1;
    $location.path('/map');
  };

  // $scope.setMapCenter = function(user) {
  //   $scope.selectedUser = user;
  //   console.log($scope.selectedUser);
  //   $scope.selectedIndex = 1;
  //   $scope.gridflex = ($scope.xlg === false) ? "flex-50" : 'noflex';
  //   $scope.cardColumn = "3";
  //   leafletData.getMap().then(function(map) {
  //     setTimeout(function() {
  //       map.invalidateSize(); // this fixes Map render Bug
  //     }, 200);
  //   }); ////leafletData.getMap().then(function(map) {
  //   if (typeof(user) === "object") { // set position clicking on a user
  //     // $scope.showMap = true;
  //     $scope.mapCenter = {
  //       lat: user.lat,
  //       lng: user.lon,
  //       zoom: 17,
  //     };
  //   } else { // other toggle 
  //     console.log("not user defined");
  //     $scope.showMap = !$scope.showMap;
  //     if ($scope.showMap && $scope.xlg) {
  //       $scope.gridflex = "noFlex";
  //     } else if ($scope.showMap && !$scope.xlg) {
  //       $scope.gridflex = "flex-50";
  //     }
  //     if (!$scope.showMap) {
  //       $scope.gridflex = "";
  //     }
  //   }

  // };

  $scope.cardColumn = "2";
  $scope.gridflex = "";

  $scope.openToast = function(message) {
    $mdToast.show($mdToast.simple().content(message).position("top right"));
    // Could also do $mdToast.showSimple('Hello');
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

}]);


function DialogController($scope, $mdDialog, $http,userService) {
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

    // userService.openToast("There");
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
