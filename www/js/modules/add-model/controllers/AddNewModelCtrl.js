angular.module('modelrApp')
.controller('AddNewModelCtrl', ['AuthSvc', '$firebaseArray', '$cordovaCamera', function AddNewModelCtrl(AuthSvc, $firebaseArray, $cordovaCamera) {
  var newModel = this;
  var modelsRef = firebase.database().ref().child('models');
  var models = $firebaseArray(modelsRef);

  var user = AuthSvc.$getAuth();
  var userRef = firebase.database().ref('users/' + user.uid);

  if (user) {
    userRef.on('value', function(snap) {
      newModel.modelImage = snap.val().modelImage;
    });
  } else {
    $state.go('login');
  }


  newModel.build = {
    title: ''
  };

  newModel.modelImage = '';

  newModel.images = [];

  newModel.getTitle = function () {
    if (newModel.build.title) {
      return newModel.build.title;
    } else {
      return 'Add New Model';
    }
  };

  newModel.sliderOptions = {
    loop: false,
    effect: 'slide',
    speed: 400
  }

  // CAMERA UPLOAD


  function writeModelImage(image) {
    userRef.update({ modelImage: image });
  }

  newModel.upload = function() {
    newModel.images = [];
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
      writeModelImage(imageData);
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
      writeModelImage(imageData);
    }, function(error) {
      console.log(error);
    });
  };

  // SUBMIT ADD MODEL

  newModel.build = {
    builder: 'Martín Castre',
    dateStarted: Date.now()
  };

  newModel.addModel = function () {
    models.$add(angular.copy(newModel.build));
    newModel.newModelForm = {};
  };

  newModel.images = models;
}]);
