angular.module('modelrApp')
.controller('LoginCtrl', ['$scope', '$state', 'AuthSvc', '$ionicModal', function LoginCtrl($scope, $state, AuthSvc, $ionicModal) {
  var login = this;
  var dateNow = new Date();
  var provider = new firebase.auth.FacebookAuthProvider();

  $ionicModal.fromTemplateUrl('templates/login-modal-template.html', function($ionicModal) {
    login.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  login.errorMessage = '';

  login.date = dateNow.getFullYear();

  login.openLoginModal = function () {
    login.modal.show();
  };

  login.closeLoginModal = function () {
    login.modal.hide();
  };

  login.login = function () {
    login.modal.hide();
    AuthSvc.$signInWithEmailAndPassword(login.email, login.password).then(function(result) {
      console.log('Signed in as: ' + result.email);
      $state.go('models');
    }).catch(function(error) {
      login.errorMessage = error;
      console.log('Login failed - ', error);
    });
  };

  login.facebookLogin = function () {
    AuthSvc.$signInWithRedirect(provider).then(function() {
      // FB redirect happens
      $state.go('models');
    }).catch(function(error) {
      login.errorMessage = error;
      console.log('Facebook Auth failed: ', error);
    });
  };

}]);
