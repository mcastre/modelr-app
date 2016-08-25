angular.module('modelrApp')
.controller('ModelViewCtrl', ['$state', '$firebaseObject', '$stateParams', '$cordovaCamera', function ModelViewCtrl($state, $firebaseObject, $stateParams, $cordovaCamera) {
  var model = this;
  var pathID = $stateParams.id;
  var modelRef = firebase.database().ref().child('modelsCollection/' + pathID);

  model.data = $firebaseObject(modelRef);
  model.modelImage = '';

  modelRef.on('value', function (snap) {
    model.modelImage = snap.val().modelImage;
  });

  function writeModelImage(image) {
    modelRef.update({ modelImage: image });
  }

  model.upload = function() {
    model.images = [];
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

  model.uploadFromPhotos = function() {
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


}]);
