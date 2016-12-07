angular.module('modelrApp')
.controller('ModelViewCtrl', ['$scope', '$state', '$firebaseObject', '$stateParams', '$cordovaCamera', '$ionicActionSheet', '$firebaseArray', '$ionicModal', 'ModelSuppliesSvc', 'ModelPaintsSvc', 'ModelImageUploadSvc', 'PaintsSvc', 'AuthSvc', '$ionicLoading', '$timeout', function ModelViewCtrl($scope, $state, $firebaseObject, $stateParams, $cordovaCamera, $ionicActionSheet, $firebaseArray, $ionicModal, ModelSuppliesSvc, ModelPaintsSvc, ModelImageUploadSvc, PaintsSvc, AuthSvc, $ionicLoading, $timeout) {
  var model = this;
  var pathID = $stateParams.id;
  var modelRef = firebase.database().ref().child('modelsCollection/' + pathID);

  model.auth = AuthSvc;
  model.data = {};

  model.auth.$onAuthStateChanged(function(user) {
    if (user) {
      getModel(user);
      model.user = user;
    } else {
      $ionicLoading.hide();
      $state.go('login');
    }
  });

  model.supplies = ModelSuppliesSvc.getModelSupplies();
  model.paints = ModelPaintsSvc.getModelPaints();
  model.photos = ModelImageUploadSvc.getGalleryPhotos();

  model.paintManufacturers = PaintsSvc.getPaints();

  model.slideIndex = 1;
  model.modelImage = '';
  model.statusChange = '';
  model.isEditModeStatus = false;
  model.isEditModeClass = false;
  model.isEditModeManufacturer = false;
  model.showMainView = true;
  model.showPaintsView = false;

  // Loading
  model.loadingProperties = {
    template: 'Getting model... <ion-spinner icon="crescent" class="spinner-light"></ion-spinner>',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  };

  $ionicLoading.show(model.loadingProperties);

  function getModel(authData) {
    return modelRef.on('value', function(snap) {
      $timeout(function () {
        $ionicLoading.hide();
        model.data = $firebaseObject(modelRef);
      });
    });
  }

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

  model.paintPriorities = [
    "Primary Color",
    "Secondary Color",
    "Highlights",
    "Accents"
  ];

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
  };

  model.accessCamera = function() {
    model.images = [];
    ModelImageUploadSvc.accessCamera();
  };

  model.accessPhotos = function() {
    ModelImageUploadSvc.accessPhotos();
  };

  model.addGalleryPhoto = function() {
    ModelImageUploadSvc.addPhotoToGallery();
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
    ModelSuppliesSvc.addSupplyItem(item);
    model.supplyItem.name = '';
  };

  model.removeSupplyItem = function(item) {
    ModelSuppliesSvc.removeSupplyItem(item);
  };

  // MODEL PAINTS ----------------------------------------------

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
    ModelPaintsSvc.addModelPaint(paint);

    model.paint = {
      title: '',
      manufacturer: '',
      type: '',
      hexKey: '',
      swatch: '',
      inStock: false
    };

    model.modal.hide();
  };


  $ionicModal.fromTemplateUrl('js/modules/model-detail/templates/gallery-slider-modal-template.html', function($ionicModal) {
    model.galleryModal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  model.openGallerySlider = function (index) {
    console.log(index);
    model.galleryModal.show();
    model.slideIndex = index;
  };

  model.closeGallerySlider = function () {
    model.galleryModal.hide();
  };

}]);
