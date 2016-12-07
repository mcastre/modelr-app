angular.module('modelrApp')
.controller('ResourcesCtrl', ['$scope', '$state', '$ionicActionSheet', '$ionicModal', 'AddResourceSvc', 'AuthSvc', '$ionicLoading', '$timeout', function ResourcesCtrl($scope, $state, $ionicActionSheet, $ionicModal, AddResourceSvc, AuthSvc, $ionicLoading, $timeout) {

  var resources = this;
  var resourcesRef = firebase.database().ref().child('resourcesCollection');

  resources.auth = AuthSvc;

  resources.auth.$onAuthStateChanged(function(user) {
    if (user) {
      getUserResources(user);
      resources.user = user;
    } else {
      $ionicLoading.hide();
      console.log('Logged out');
      $state.go('login');
    }
  });

  resources.allResources = {};

  resources.video = {
    url: ''
  };

  // Loading
  resources.loadingProperties = {
    template: 'Loading your resources...',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  };

  $ionicLoading.show(resources.loadingProperties);

  function getUserResources(authData) {
    var userResourcesRef = firebase.database().ref().child('users/' + authData.uid + '/resources');
    return userResourcesRef.on('child_added', function (snap) {
      var resourceID = snap.key;
      return resourcesRef.child(resourceID).on('value', function (snap) {
        $timeout(function () {
          $ionicLoading.hide();
          return resources.allResources[resourceID] = snap.val();
        })
      });
    });
  }

  resources.openCategoryActionSheet = function () {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Add YouTube Video URL' },
        { text: 'Add Web URL' }
      ],
      titleText: 'Add New Resource',
      cancelText: 'Cancel',
      buttonClicked: function (index) {
        if (index === 0) {
          resources.openAddYouTubeURLModal();
        } else if (index === 1) {
          console.log("add web url selected.");
        }
        return true;
      }
    })
  };


  $ionicModal.fromTemplateUrl('js/modules/resources/templates/add-youtube-url-modal-template.html', function($ionicModal) {
    resources.addYouTubeURLModal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  resources.openAddYouTubeURLModal = function () {
    resources.addYouTubeURLModal.show();
  };

  resources.closeAddYouTubeURLModal = function () {
    resources.addYouTubeURLModal.hide();
  };

  resources.addYouTubeVideo = function(video) {
    var newUrl = video.url.replace(/['"]+/g, '');
    video.url = newUrl;
    AddResourceSvc.addYouTubeVideo(video, resources.user.uid);
  };

  resources.userHasResources = function () {
    return Object.keys(resources.allResources).length;
  };

}]);
