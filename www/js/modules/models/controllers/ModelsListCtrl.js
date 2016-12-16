angular.module('modelrApp')
.controller('ModelsListCtrl', ['$state', 'AuthSvc', '$ionicLoading', '$firebaseArray', 'LoginSvc', '$timeout', '$cordovaToast', 'ModelPaintsSvc', function ModelsListCtrl ($state, AuthSvc, $ionicLoading, $firebaseArray, LoginSvc, $timeout, $cordovaToast, ModelPaintsSvc) {
  var models = this;
  var modelsRef = firebase.database().ref().child('modelsCollection');
  var paintsRef = firebase.database().ref().child('paintsCollection');
  models.allModels = {};

  // Loading
  models.loadingProperties = {
    template: 'Logging In... <ion-spinner icon="crescent" class="spinner-light"></ion-spinner>',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  };

  $ionicLoading.show(models.loadingProperties);

  // Get User Models
  function getUserModels (authData) {
    var userModelsRef = firebase.database().ref().child('users/' + authData.uid + '/models');
    return userModelsRef.on('child_added', function (snap) {
      var modelID = snap.key;
      return modelsRef.child(modelID).on('value', function (snap) {
        $timeout(function () {
          $ionicLoading.hide();
          return models.allModels[modelID] = snap.val();
        })
      });
    });
  }

  AuthSvc.$onAuthStateChanged(function(authData) {
    if (authData) {
      getUserModels(authData);
      $cordovaToast.show('Signed in as: ' + authData.email, 'short', 'bottom');
    } else {
      $ionicLoading.hide();
      console.log('Logged out');
      $state.go('login');
    }
  });

  models.userHasModels = function () {
    return Object.keys(models.allModels).length;
  };

  models.getModelPaintsCount = function (paints) {
    return Object.keys(paints).length;
  };

  models.getModelSuppliesCount = function (supplies) {
    return Object.keys(supplies).length;
  };

  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      var token = result.credential.accessToken;
    }
    var user = result.user;
  }).catch(function(error) {
    console.log(error);
  });

  models.logout = function () {
    LoginSvc.$logout();
    console.log('Signed Out...');
  };

}]);
