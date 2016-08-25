angular.module('modelrApp')
.controller('ModelViewCtrl', ['$scope', '$state', '$firebaseObject', '$stateParams', '$cordovaCamera', '$ionicModal', function ModelViewCtrl($scope, $state, $firebaseObject, $stateParams, $cordovaCamera, $ionicModal) {
  var model = this;
  var pathID = $stateParams.id;
  var modelRef = firebase.database().ref().child('modelsCollection/' + pathID);

  model.data = $firebaseObject(modelRef);
  model.modelImage = '';

  modelRef.on('value', function (snap) {
    model.modelImage = snap.val().modelImage;
  });

  // UPLOAD IMAGE MODAL
  $ionicModal.fromTemplateUrl('js/modules/model-detail/templates/upload-image-template.html', function($ionicModal) {
    model.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  model.upload = function() {
    model.modal.show();
  };

  model.closeUploadModal = function() {
    model.modal.hide();
  };

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
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      writeModelImage(imageData);
      model.modal.hide();
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
      model.modal.hide();
    }, function(error) {
      console.log(error);
    });
  };


}]);
