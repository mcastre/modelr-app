angular.module('modelrApp')
.controller('TabsCtrl', ['AuthSvc', '$state', '$firebaseArray', '$ionicLoading', '$ionicConfig', '$ionicTabsDelegate', function TabsCtrl(AuthSvc, $state, $firebaseArray, $ionicLoading, $ionicConfig, $ionicTabsDelegate) {

  var tabs = this;

  tabs.loadingProperties = {
    template: 'Getting Your Models...',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  };

  $ionicLoading.show(tabs.loadingProperties);

  tabs.currentTab = {
    index: 0
  };

  tabs.onClickTab = function (tabIndex) {
    tabs.currentTab.index = tabIndex;
  };
  tabs.isCurrentTab = function(tabIndex) {
    return tabs.currentTab.index === tabIndex;
  };

  tabs.goTabModels = function () {
    tabs.onClickTab(0);
    $ionicConfig.views.transition('platform');
    $state.go('tabs.models');
  };

  tabs.goTabInventory = function () {
    tabs.onClickTab(1);
    $ionicConfig.views.transition('platform');
    $state.go('tabs.inventory');
  };

  tabs.goTabResources = function () {
    tabs.onClickTab(2);
    $ionicConfig.views.transition('platform');
    $state.go('tabs.resources');
  };

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
