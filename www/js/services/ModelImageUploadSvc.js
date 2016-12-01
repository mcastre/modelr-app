angular
  .module('modelrApp')
  .factory('ModelImageUploadSvc', modelImageUploadSvc);

modelImageUploadSvc.$inject = ['$cordovaCamera', '$ionicActionSheet', '$stateParams', '$firebaseArray'];

function modelImageUploadSvc($cordovaCamera, $ionicActionSheet, $stateParams, $firebaseArray) {
  var factory = {
    accessCamera: accessCamera,
    accessPhotos: accessPhotos,
    getGalleryPhotos: getGalleryPhotos,
    addPhotoToGallery: addPhotoToGallery
  };

  var pathID = $stateParams.id;
  var modelRef = firebase.database().ref().child('modelsCollection/' + pathID);

  var modelPhotosRef = modelRef.child('Photos');
  var photos = $firebaseArray(modelPhotosRef);

  function writeModelImage(image) {
    modelRef.update({ modelImage: image });
  }

  function writePhotoGalleryImage(image) {
    photos.$add(image)
      .then(function(ref) {
        var modelId = ref.key;
      });
  }

  function accessCamera() {
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
    $cordovaCamera.getPicture(options)
      .then(function(imageData) {
        writeModelImage(imageData);
      }, function(error) {
        console.log(error);
      });
  }

  function accessPhotos() {
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
    $cordovaCamera.getPicture(options)
      .then(function(imageData) {
        writeModelImage(imageData);
      }, function(error) {
        console.log(error);
      });
  }

  function getGalleryPhotos() {
    return photos;
  }

  function addPhotoToGallery() {
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
    $cordovaCamera.getPicture(options)
      .then(function(imageData) {
        writePhotoGalleryImage(imageData);
      }, function(error) {
        console.log(error);
      });
  }


  return factory;
}
