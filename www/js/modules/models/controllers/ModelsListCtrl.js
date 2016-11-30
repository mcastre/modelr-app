angular.module('modelrApp')
.controller('ModelsListCtrl', ['$state', 'AuthSvc', '$ionicLoading', '$firebaseArray', 'LoginSvc', '$timeout', '$cordovaToast', function ModelsListCtrl ($state, AuthSvc, $ionicLoading, $firebaseArray, LoginSvc, $timeout, $cordovaToast) {
  var models = this;
  var modelsRef = firebase.database().ref().child('modelsCollection');
  models.allModels = {};

  // Loading
  models.loadingProperties = {
    template: 'Logging In...',
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
      console.log('Logged in', authData);
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
