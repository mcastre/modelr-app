angular.module('modelrApp')
.controller('ModelViewCtrl', ['$scope', '$state', '$firebaseObject', '$stateParams', '$cordovaCamera', '$ionicActionSheet', function ModelViewCtrl($scope, $state, $firebaseObject, $stateParams, $cordovaCamera, $ionicActionSheet) {
  var model = this;
  var pathID = $stateParams.id;
  var modelRef = firebase.database().ref().child('modelsCollection/' + pathID);

  model.data = $firebaseObject(modelRef);
  model.modelImage = '';
  model.statusChange = '';
  model.isEditModeStatus = false;
  model.isEditModeClass = false;
  model.isEditModeManufacturer = false;

  modelRef.on('value', function (snap) {
    model.modelImage = snap.val().modelImage;
  });

  modelRef.on('child_changed', function (data) {
    model.modelImage = data.val().modelImage;
  });

  // CAMERA ACTION SHEET METHOD
  model.openCameraActionSheet = function () {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Upload from Photos' },
        { text: 'Take Picture' }
      ],
      titleText: 'Change Model Picture',
      cancelText: 'Cancel',
      buttonClicked: function (index) {
        if (index === 0) {
          model.accessPhotos();
        } else if (index === 1) {
          model.accessCamera();
        }
        return true;
      }
    })
  }

  function writeModelImage(image) {
    modelRef.update({ modelImage: image });
  }

  model.accessCamera = function() {
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
      saveToPhotoAlbum: true
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      writeModelImage(newName);
    }, function(error) {
      console.log(error);
    });
  };

  model.accessPhotos = function() {
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

  // Update Model Details
  model.toggleEditModeStatus = function () {
    model.isEditModeStatus = !model.isEditModeStatus;
  };

  model.updateStatus = function (newValue) {
    modelRef.child('status').set(newValue);
    model.isEditModeStatus = false;
  };

  model.toggleEditModeClass = function () {
    model.isEditModeClass = !model.isEditModeClass;
  };

  model.updateClass = function (newValue) {
    modelRef.child('classType').set(newValue);
    model.isEditModeClass = false;
  };

  model.toggleEditModeManufacturer = function () {
    model.isEditModeManufacturer = !model.isEditModeManufacturer;
  };

  model.updateManufacturer = function (newValue) {
    modelRef.child('manufacturer').set(newValue);
    model.isEditModeManufacturer = false;
  };

}]);
