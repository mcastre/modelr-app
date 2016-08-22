angular.module('modelrApp')
.controller('WelcomeCtrl', ['$scope', '$state', 'AuthSvc', '$ionicHistory', '$cordovaCamera', '$firebaseArray', '$ionicLoading', function($scope, $state, AuthSvc, $ionicHistory, $cordovaCamera, $firebaseArray, $ionicLoading) {

  var welcome = this;
  var user = AuthSvc.$getAuth();
  var userRef = firebase.database().ref('users/' + user.uid);
  var profileImagesArray = $firebaseArray(userRef);

  welcome.images = [];


  $ionicHistory.clearHistory();

  AuthSvc.$onAuthStateChanged(function(authData) {
    if (authData) {
      $ionicLoading.hide();
      welcome.images = profileImagesArray;
    } else {
      $ionicLoading.hide();
      $state.go('login');
    }
  });

  if (user) {
    userRef.on('value', function(snap) {
      welcome.userData = snap.val();
      welcome.userName = welcome.userData.displayName;
      welcome.profileImage = welcome.userData.photoURL;
    });
    welcome.images = profileImagesArray;
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

  function writeUserProfileImage(image) {
    userRef.update({ photoURL: image });
  }



  // CAMERA UPLOAD

  welcome.upload = function() {
    welcome.images = [];
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
      writeUserProfileImage(imageData);
    }, function(error) {
      console.log(error);
    });
  };

  welcome.uploadFromPhotos = function() {
    var options = {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      writeUserProfileImage(imageData);
    }, function(error) {
      console.log(error);
    });
  };

  welcome.goToHome = function () {
    $state.go('tabs.models');
  };

}]);
