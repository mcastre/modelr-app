angular.module('modelrApp')
.controller('WelcomeCtrl', ['$scope', '$state', 'AuthSvc', '$ionicHistory', '$cordovaCamera', '$firebaseArray', '$ionicLoading', function($scope, $state, AuthSvc, $ionicHistory, $cordovaCamera, $firebaseArray, $ionicLoading) {

  var welcome = this;
  var user = AuthSvc.$getAuth();

  $ionicHistory.clearHistory();

  welcome.images = [];
  welcome.syncArray = [];

  AuthSvc.$onAuthStateChanged(function(authData) {
    if (authData) {
      welcome.userData = authData;
      welcome.userName = authData.displayName;
      console.log('Logged in', authData);
      $ionicLoading.hide();
    } else {
      console.log('Logged out');
      $ionicLoading.hide();
      $state.go('login');
    }
  });

  if (user) {
    // success
  } else {
    $state.go('login');
  }

  welcome.sliderOptions = {
    loop: false,
    effect: 'fade',
    speed: 500
  }

  $scope.$on('$ionicSlides.sliderInitialized', function(event, data) {
    $scope.slider = data.slider;
  });

  function writeUserProfileImage(userID, image) {
    firebase.database().ref('users/' + userID).update({
      photoURL: image
    });
  }

  // CAMERA UPLOAD

  welcome.upload = function() {
    var options = {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      writeUserProfileImage(welcome.userData.uid, imageData);
    }, function(error) {
      console.log(error);
    });
  };

  welcome.goToHome = function () {
    $state.go('models');
  };

}]);
