angular.module('modelrApp')
.controller('HomeCtrl', ['$state', 'AuthSvc', function HomeCtrl($state, AuthSvc) {
  var home = this;

  AuthSvc.$onAuthStateChanged(function(authData) {
    if (authData) {
      console.log('Logged in', authData);
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
