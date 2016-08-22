angular.module('modelrApp')
.controller('LoginCtrl', ['$scope', '$state', 'AuthSvc', '$ionicModal', '$ionicLoading', '$firebaseArray', function LoginCtrl($scope, $state, AuthSvc, $ionicModal, $ionicLoading, $firebaseArray) {
  var login = this;
  var dateNow = new Date();
  var provider = new firebase.auth.FacebookAuthProvider();

  login.newUserSetUp = false;
  login.loadingProperties = {
    template: 'Logging In...',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  };

  $ionicLoading.show(login.loadingProperties);

  $ionicModal.fromTemplateUrl('templates/login-modal-template.html', function($ionicModal) {
    login.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  login.errorMessage = '';

  login.date = dateNow.getFullYear();

  login.openLoginModal = function (newUser) {
    if (newUser === 'newUser') {
      login.newUserSetUp = true;
      login.modal.show();
    } else {
      login.newUserSetUp = false;
      login.modal.show();
    }
  };

  login.closeLoginModal = function () {
    login.modal.hide();
  };

  login.login = function () {
    login.modal.hide();
    $ionicLoading.show(login.loadingProperties);
    AuthSvc.$signInWithEmailAndPassword(login.email, login.password).then(function(result) {
      console.log('Signed in as: ' + result.email);
      $ionicLoading.hide();
    }).catch(function(error) {
      login.errorMessage = error;
      console.log('Login failed - ', error);
    });
  };

  login.facebookLogin = function () {
    AuthSvc.$signInWithRedirect(provider).then(function() {
      // FB redirect happens
    }).catch(function(error) {
      login.errorMessage = error;
      console.log('Facebook Auth failed: ', error);
    });
  };

  AuthSvc.$onAuthStateChanged(function(authData) {
    if (authData) {
      console.log('Logged in', authData);
      $ionicLoading.hide();
      if (login.newUserSetUp) {
        return;
      } else {
        $state.go('tabs.models');
      }
    } else {
      console.log('Logged out');
      $ionicLoading.hide();
      $state.go('login');
    }
  });


  function writeUserData(userID, name, email) {
    firebase.database().ref('users/' + userID).set({
      userName: name,
      email: email,
      displayName: login.userName
    });
  }

  // Create User Account

  login.signUp = function (userName) {
    login.modal.hide();
    AuthSvc.$createUserWithEmailAndPassword(login.email, login.password).then(function(user) {
      writeUserData(user.uid, login.userName, login.email);
      $state.go('welcome');
    }).catch(function(error) {
      login.errorMessage = error;
      console.log(error);
    });
  };

}]);
