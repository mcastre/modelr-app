angular.module('modelrApp')
.controller('TabsCtrl', ['AuthSvc', '$state', '$firebaseArray', '$ionicLoading', function TabsCtrl(AuthSvc, $state, $firebaseArray, $ionicLoading) {

  var tabs = this;

  tabs.loadingProperties = {
    template: 'Getting Your Models...',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  };

  $ionicLoading.show(tabs.loadingProperties);

  AuthSvc.$onAuthStateChanged(function(authData) {
    if (authData) {
      getUserDetails(authData);
      $ionicLoading.hide();
    } else {
      console.log('Logged out');
      $ionicLoading.hide();
      $state.go('login');
    }
  });

  function getUserDetails (auth) {
    var usersRef = firebase.database().ref('users/' + auth.uid);
    return usersRef.on('value', function(snap) {
      return tabs.user = snap.val();
    });
  }

  // LOG OUT
  tabs.logout = function () {
    firebase.auth().signOut();
    console.log('Signed out...');
    $state.go('login');
  };

}]);
