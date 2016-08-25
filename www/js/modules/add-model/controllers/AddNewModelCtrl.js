angular.module('modelrApp')
.controller('AddNewModelCtrl', ['AuthSvc', '$firebaseArray', '$cordovaCamera', 'AddModelSvc',  function AddNewModelCtrl(AuthSvc, $firebaseArray, $cordovaCamera, AddModelSvc) {
  var newModel = this;
  var user = AuthSvc.$getAuth();
  var userRef = firebase.database().ref('users/' + user.uid);

  newModel.modelImage = '';
  newModel.sliderOptions = {
    loop: false,
    effect: 'slide',
    speed: 400
  }

  if (user) {
    userRef.on('value', function(snap) {
      var userName = snap.val().displayName;
      newModel.modelImage = snap.val().modelImage;
      newModel.build = {
        dateStarted: Date.now(),
        builder: userName
      };
    });
  } else {
    $state.go('login');
  }

  newModel.getTitle = function () {
    if (newModel.build.title) {
      return newModel.build.title;
    } else {
      return 'Add New Model';
    }
  };

  // CAMERA UPLOAD


  function writeModelImage(image) {
    newModel.build.modelImage = image;
  }

  newModel.upload = function() {
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
      newModel.build.modelImage = imageData;
      //writeModelImage(imageData);
    }, function(error) {
      console.log(error);
    });
  };

  newModel.uploadFromPhotos = function() {
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
      newModel.build.modelImage = imageData;
      //writeModelImage(imageData);
    }, function(error) {
      console.log(error);
    });
  };

  // SUBMIT ADD MODEL

  newModel.addModel = function () {
    AddModelSvc.addModel(angular.copy(newModel.build), user.uid);
    console.log(newModel.build);
    newModel.build = {};
  };

}]);
