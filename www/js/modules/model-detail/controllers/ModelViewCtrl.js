angular.module('modelrApp')
.controller('ModelViewCtrl', ['$scope', '$state', '$firebaseObject', '$stateParams', '$cordovaCamera', '$ionicActionSheet', '$firebaseArray', '$ionicModal', function ModelViewCtrl($scope, $state, $firebaseObject, $stateParams, $cordovaCamera, $ionicActionSheet, $firebaseArray, $ionicModal) {
  var model = this;
  var pathID = $stateParams.id;
  var modelRef = firebase.database().ref().child('modelsCollection/' + pathID);

  // SUPPLIES REFS
  var suppliesRef = firebase.database().ref().child('suppliesCollection');
  var modelSuppliesRef = modelRef.child('Supplies');
  model.supplies = $firebaseArray(modelSuppliesRef);

  // PAINTS REFS
  var paintsRef = firebase.database().ref().child('paintsCollection');
  var modelPaintsRef = modelRef.child('Paints');
  model.paints = $firebaseArray(modelPaintsRef);

  model.data = $firebaseObject(modelRef);
  model.modelImage = '';
  model.statusChange = '';
  model.isEditModeStatus = false;
  model.isEditModeClass = false;
  model.isEditModeManufacturer = false;
  model.showMainView = true;
  model.showPaintsView = false;

  model.modelSupplies = {};
  model.supplyItem = {
    name: ''
  };

  model.paint = {
    title: '',
    manufacturer: '',
    type: '',
    hexKey: '',
    swatch: '',
    inStock: false
  };

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

  // VIEW LOGIC
  model.tabs = [
    {
      title: 'Details',
      icon: 'ion-jet',
      url: 'js/modules/model-detail/templates/model-details-list.html'
    },
    {
      title: 'Paints',
      icon: 'ion-paintbucket',
      url: 'js/modules/model-detail/views/model-paints.html'
    },
    {
      title: 'Supplies',
      icon: 'ion-wrench',
      url: 'js/modules/model-detail/views/model-supplies.html'
    },
    {
      title: 'Gallery',
      icon: 'ion-images',
      url: 'js/modules/model-detail/views/model-gallery.html'
    }
  ];

  model.currentTab = model.tabs[0];

  model.onClickTab = function (tab) {
    model.currentTab = tab;
  };

  model.isActiveTab = function (tabURL) {
    return tabURL === model.currentTab.url;
  };

  // MODEL SUPPLIES ----------------------------------------------

  model.addSupplyItem = function(item) {
    model.supplies.$add(item)
      .then(function(ref) {
        console.log(ref);
        var modelId = ref.key;
        model.supplies.$save(modelId);
      });

    model.supplyItem.name = '';
  };

  model.removeSupplyItem = function(item) {
    model.supplies.$remove(item).then(function(ref) {
      console.log('Removed item: ', ref.key);
    });
  };

  model.modelHasSupplies = function () {
    return Object.keys(model.modelSupplies).length;
  };

  // ADD MODEL PAINTS ----------------------------------------------

  // ADD PAINT MODAL
  $ionicModal.fromTemplateUrl('js/modules/model-detail/templates/add-model-paints-modal-template.html', function($ionicModal) {
    model.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  model.openAddPaintModal = function () {
    model.modal.show();
  };

  model.closeAddPaintModal = function () {
    model.modal.hide();
  };

  model.addPaint = function (paint) {
    console.log(paint);
    model.paints.$add(paint)
      .then(function(ref) {
        var modelId = ref.key;
        model.paints.$save(modelId);
        console.log('Paint saved successfully: ', modelId);
        model.modal.hide();
      });

      model.paint = {
        title: '',
        manufacturer: '',
        type: '',
        hexKey: '',
        swatch: '',
        inStock: false
      };

  };

}]);
