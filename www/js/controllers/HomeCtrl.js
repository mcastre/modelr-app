angular.module('modelrApp')
.controller('HomeCtrl', ['$state', 'AuthSvc', function HomeCtrl($state, AuthSvc) {
  var home = this;
  var user = AuthSvc.$getAuth();

  if (user) {
    home.user = user;
  } else {
    $state.go('login');
  }

  AuthSvc.$onAuthStateChanged(function(authData) {
    if (authData) {
      // success
      home.userData = authData;
    } else {
      console.log('Logged out');
      $state.go('login');
    }
  });

  home.logout = function () {
    AuthSvc.$signOut();
    console.log('Signed out...');
    $state.go('login');
  };
}]);
