angular.module('modelrApp')
.controller('InventoryCtrl', ['$state', '$ionicConfig', function InventoryCtrl($state, $ionicConfig) {

  var inventory = this;

  inventory.currentTab = {
    index: 0
  };

  inventory.onClickTab = function (tabIndex) {
    inventory.currentTab.index = tabIndex;
  };
  inventory.isCurrentTab = function(tabIndex) {
    return inventory.currentTab.index === tabIndex;
  };

  inventory.goTabPaints = function () {
    inventory.onClickTab(0);
    $ionicConfig.views.transition('platform');
    $state.go('tabs.inventory.paints');
  };

  inventory.goTabSupplies = function () {
    inventory.onClickTab(1);
    $ionicConfig.views.transition('platform');
    $state.go('tabs.inventory.supplies');
  };

}]);
